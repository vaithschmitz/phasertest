const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();

    // setScale scales img by x, call refresh body for changes to take effect
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');  
    
    player = this.physics.add.sprite(100, 450, 'dude');


    let stars = this.physics.add.group({
        key: 'star',
        repeat: 50,
        setXY: { x: 12, y: 0, stepX: 30 }
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    player.setBounce(0.2);
    // edge of window
    player.setCollideWorldBounds(true);
    player.body.setGravityY(100)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
 
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });


}

function update (){
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown){
        player.setVelocityX(-250);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown){
        player.setVelocityX(250);

        player.anims.play('right', true);
    }
    else{
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    // jump
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-750);
    }
}


