const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const shopElement = document.getElementById('shop');

let planets = [
    { x: canvas.width / 2, y: canvas.height / 2, radius: 30, mass: 1000, color: '#444', vx: 0, vy: 0 },
    { x: canvas.width / 2 + 200, y: canvas.height / 2, radius: 20, mass: 500, color: '#666', vx: 0, vy: -0.5 },
    { x: canvas.width / 2 - 200, y: canvas.height / 2, radius: 25, mass: 700, color: '#555', vx: 0, vy: 0.5 },
    { x: canvas.width / 2, y: canvas.height / 2 + 150, radius: 18, mass: 400, color: '#777', vx: 0.3, vy: 0 },
    { x: canvas.width / 2 + 100, y: canvas.height / 2 - 100, radius: 22, mass: 600, color: '#888', vx: -0.2, vy: 0.2 }
];

let ships = [];
let asteroids = [];
let score = 0;
let currency = 0;
let selectedShipType = 'satellite';

class Ship {
    constructor(x, y, vx, vy, type) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;
        this.mass = type === 'satellite' ? 1 : type === 'probe' ? 2 : 3;
        this.radius = type === 'satellite' ? 5 : type === 'probe' ? 7 : 10;
        this.color = type === 'satellite' ? '#fff' : type === 'probe' ? '#0f0' : '#f00';
        this.orbitTime = 0;
    }

    update() {
        planets.forEach(planet => {
            const dx = planet.x - this.x;
            const dy = planet.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
                const force = (planet.mass * this.mass) / (distance * distance);
                const ax = (force * dx) / distance;
                const ay = (force * dy) / distance;

                this.vx += ax * 0.05;
                this.vy += ay * 0.05;
            }
        });

        // Satellites attract asteroids
        if (this.type === 'satellite') {
            asteroids.forEach(asteroid => {
                const dx = asteroid.x - this.x;
                const dy = asteroid.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 0 && distance < 100) {
                    const force = 0.1;
                    const ax = (this.x - asteroid.x) / distance * force;
                    const ay = (this.y - asteroid.y) / distance * force;
                    asteroid.vx += ax;
                    asteroid.vy += ay;
                }
            });
        }

        this.x += this.vx;
        this.y += this.vy;

        // Bounce on edges
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.vx = -this.vx;
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.vy = -this.vy;
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }

        this.orbitTime++;
        if (this.orbitTime % 60 === 0) {
            currency += 1;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}

class Asteroid {
    constructor(x, y, vx, vy, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.mass = radius * 2;
        this.color = '#888';
    }

    update() {
        planets.forEach(planet => {
            const dx = planet.x - this.x;
            const dy = planet.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
                const force = (planet.mass * this.mass) / (distance * distance);
                const ax = (force * dx) / distance;
                const ay = (force * dy) / distance;

                this.vx += ax * 0.02;
                this.vy += ay * 0.02;
            }
        });

        this.x += this.vx;
        this.y += this.vy;

        // Bounce on edges
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.vx = -this.vx;
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.vy = -this.vy;
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}

function drawPlanets() {
    planets.forEach(planet => {
        ctx.fillStyle = planet.color;
        ctx.fillRect(planet.x - planet.radius, planet.y - planet.radius, planet.radius * 2, planet.radius * 2);
    });
}

function updatePlanets() {
    planets.forEach((planet, i) => {
        planets.forEach((other, j) => {
            if (i !== j) {
                const dx = other.x - planet.x;
                const dy = other.y - planet.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 0) {
                    const force = (other.mass * planet.mass) / (distance * distance);
                    const ax = (force * dx) / distance;
                    const ay = (force * dy) / distance;
                    planet.vx += ax * 0.0005;
                    planet.vy += ay * 0.0005;
                }
            }
        });
        planet.x += planet.vx;
        planet.y += planet.vy;

        // Bounce on edges
        if (planet.x - planet.radius < 0 || planet.x + planet.radius > canvas.width) {
            planet.vx = -planet.vx;
            planet.x = Math.max(planet.radius, Math.min(canvas.width - planet.radius, planet.x));
        }
        if (planet.y - planet.radius < 0 || planet.y + planet.radius > canvas.height) {
            planet.vy = -planet.vy;
            planet.y = Math.max(planet.radius, Math.min(canvas.height - planet.radius, planet.y));
        }
    });
}

function update() {
    updatePlanets();
    ships.forEach(ship => ship.update());
    asteroids.forEach(asteroid => asteroid.update());
    checkCollisions();
    score = ships.length + asteroids.length;

    // Spawn asteroids occasionally
    if (Math.random() < 0.01) {
        const side = Math.floor(Math.random() * 4);
        let x, y, vx, vy;
        const radius = 3 + Math.random() * 5;
        switch (side) {
            case 0: // top
                x = Math.random() * canvas.width;
                y = -radius;
                vx = (Math.random() - 0.5) * 2;
                vy = Math.random() * 2;
                break;
            case 1: // right
                x = canvas.width + radius;
                y = Math.random() * canvas.height;
                vx = -Math.random() * 2;
                vy = (Math.random() - 0.5) * 2;
                break;
            case 2: // bottom
                x = Math.random() * canvas.width;
                y = canvas.height + radius;
                vx = (Math.random() - 0.5) * 2;
                vy = -Math.random() * 2;
                break;
            case 3: // left
                x = -radius;
                y = Math.random() * canvas.height;
                vx = Math.random() * 2;
                vy = (Math.random() - 0.5) * 2;
                break;
        }
        asteroids.push(new Asteroid(x, y, vx, vy, radius));
    }

    // Spawn planets occasionally
    if (Math.random() < 0.005) {
        const newPlanet = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 10 + Math.random() * 20,
            mass: 200 + Math.random() * 300,
            color: '#' + Math.floor(Math.random()*16777215).toString(16),
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        };
        planets.push(newPlanet);
    }
}

function checkCollisions() {
    // Ship-Planet collisions: bounce
    ships.forEach(ship => {
        planets.forEach(planet => {
            const dx = ship.x - planet.x;
            const dy = ship.y - planet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ship.radius + planet.radius) {
                // Simple bounce: reverse velocity
                ship.vx = -ship.vx;
                ship.vy = -ship.vy;
            }
        });
    });

    // Ship-Ship collisions: bounce
    for (let i = 0; i < ships.length; i++) {
        for (let j = i + 1; j < ships.length; j++) {
            const ship1 = ships[i];
            const ship2 = ships[j];
            const dx = ship1.x - ship2.x;
            const dy = ship1.y - ship2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ship1.radius + ship2.radius) {
                // Swap velocities for bounce
                [ship1.vx, ship2.vx] = [ship2.vx, ship1.vx];
                [ship1.vy, ship2.vy] = [ship2.vy, ship1.vy];
            }
        }
    }

    // Planet-Planet collisions: merge or become asteroids
    for (let i = planets.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            const planet1 = planets[i];
            const planet2 = planets[j];
            const dx = planet1.x - planet2.x;
            const dy = planet1.y - planet2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < planet1.radius + planet2.radius) {
                // Randomly decide: merge or become asteroids
                if (Math.random() < 0.5) {
                    // Merge
                    const totalMass = planet1.mass + planet2.mass;
                    const newRadius = Math.sqrt(planet1.radius ** 2 + planet2.radius ** 2);
                    const newX = (planet1.x * planet1.mass + planet2.x * planet2.mass) / totalMass;
                    const newY = (planet1.y * planet1.mass + planet2.y * planet2.mass) / totalMass;
                    const newVx = (planet1.vx * planet1.mass + planet2.vx * planet2.mass) / totalMass;
                    const newVy = (planet1.vy * planet1.mass + planet2.vy * planet2.mass) / totalMass;
                    const newColor = planet1.color; // Keep first color
                    planets.splice(i, 1);
                    planets.splice(j, 1);
                    planets.push({
                        x: newX,
                        y: newY,
                        radius: newRadius,
                        mass: totalMass,
                        color: newColor,
                        vx: newVx,
                        vy: newVy
                    });
                } else {
                    // Become asteroids
                    const numAsteroids = Math.floor(Math.random() * 3) + 2; // 2-4 asteroids
                    for (let k = 0; k < numAsteroids; k++) {
                        const angle = (Math.PI * 2 * k) / numAsteroids;
                        const speed = 1 + Math.random() * 2;
                        const vx = Math.cos(angle) * speed;
                        const vy = Math.sin(angle) * speed;
                        const radius = 3 + Math.random() * 4;
                        asteroids.push(new Asteroid(planet1.x, planet1.y, vx, vy, radius));
                    }
                    planets.splice(i, 1);
                    planets.splice(j, 1);
                }
                break;
            }
        }
    }

    // Asteroid-Planet collisions: bounce
    asteroids.forEach(asteroid => {
        planets.forEach(planet => {
            const dx = asteroid.x - planet.x;
            const dy = asteroid.y - planet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < asteroid.radius + planet.radius) {
                asteroid.vx = -asteroid.vx;
                asteroid.vy = -asteroid.vy;
            }
        });
    });

    // Ship-Asteroid collisions: collect asteroid
    ships.forEach(ship => {
        asteroids.forEach((asteroid, index) => {
            const dx = ship.x - asteroid.x;
            const dy = ship.y - asteroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ship.radius + asteroid.radius) {
                asteroids.splice(index, 1);
                currency += ship.type === 'satellite' ? 10 : 5; // Satellites give more currency
            }
        });
    });

    // Planet-Asteroid collisions: planet absorbs asteroid
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i];
        for (let j = planets.length - 1; j >= 0; j--) {
            const planet = planets[j];
            const dx = asteroid.x - planet.x;
            const dy = asteroid.y - planet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < asteroid.radius + planet.radius) {
                // Absorb: increase planet mass/radius
                planet.mass += asteroid.mass;
                planet.radius = Math.sqrt(planet.radius ** 2 + asteroid.radius ** 2);
                asteroids.splice(i, 1);
                break; // Asteroid absorbed, no need to check other planets
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlanets();
    ships.forEach(ship => ship.draw());
    asteroids.forEach(asteroid => asteroid.draw());
    scoreElement.textContent = `Ships: ${ships.length} | Asteroids: ${asteroids.length} | Currency: ${currency}`;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 30) {
        const angle = Math.atan2(dy, dx);
        const speed = Math.min(distance / 50, 5);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        ships.push(new Ship(x, y, vx, vy, selectedShipType));
    }
});

function buyShip(type, cost) {
    if (currency >= cost) {
        currency -= cost;
        selectedShipType = type;
    }
}

function buyAsteroid(cost) {
    if (currency >= cost) {
        currency -= cost;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 4;
        const vy = (Math.random() - 0.5) * 4;
        const radius = 5 + Math.random() * 5;
        asteroids.push(new Asteroid(x, y, vx, vy, radius));
    }
}

shopElement.innerHTML = `
    <button onclick="buyShip('satellite', 0)">Satellite (0)</button>
    <button onclick="buyShip('probe', 10)">Probe (10)</button>
    <button onclick="buyShip('station', 20)">Station (20)</button>
    <button onclick="buyPlanet(50)">New Planet (50)</button>
    <button onclick="buyAsteroid(15)">Spawn Asteroid (15)</button>
`;

gameLoop();
