var MonsterKong = MonsterKong || {};

MonsterKong.GameState = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.world.setBounds(0, 0, 360, 700);
    },

    preload: function () {
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('goal', 'assets/images/gorilla3.png');
        this.load.image('barrel', 'assets/images/barrel.png');

        this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
        this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);

        this.load.text('level', 'assets/data/level.json');


    },

    create: function () {
        this.levelData = JSON.parse(this.game.cache.getText('level'));

        this.createGameSet();

        this.player = new MonsterKong.Player(this.game, this.levelData, this.cursors);
        this.game.add.existing(this.player);
    },

    update: function () {

    },

    createGameSet: function () {
        this.ground = this.add.sprite(0, 638, 'ground');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        this.levelData.platformData.forEach(function(element){
                this.platforms.create(element.x, element.y, 'platform');
                this.platforms.setAll('body.allowGravity', false);
                this.platforms.setAll('body.immovable', true);
        },this);


    }
}