var HP = 11;
var input;
var isLeftButtonDown=false;
var isRightButtonDown=false;
var distanceY;
var distanceX;

class partie_1 extends Phaser.Scene {
    constructor() {
        super('partie_1');
        this.canshootA1 = true
        this.canshoot = true
        this.canshoot2 = true
        this.canshoot3 = true
        this.canshoot4 = true
        this.canshoot5 = true
        this.canshoot6 = true
        this.canshoot7 = true
        this.canshoot8 = true
        this.canshoot9 = true
        this.canshoot10 = true
        this.canshoot11 = true
        this.canshoot12 = true
        this.canshoot13 = true
        this.canshoot14 = true
        this.canshoot15 = true




    }

    preload() {
        this.load.tilemapTiledJSON("partie_1", "maps/partie_1.json");
        this.load.image("phaser_assets", "maps/test.png");
        this.load.image('perso', 'sprites/test_perso.png');
        this.load.image('ascensseur', 'maps/ascensseur.png');
        this.load.image('hb_ascensseur', 'maps/hb_ascensseur.png');
        this.load.image('plateforme', 'maps/plateforme.png');
        this.load.image('arme1', 'sprites/arme_1.png');
        this.load.image('tourelle', 'sprites/tourelle.png');
        this.load.image('lazzzzzer', 'sprites/lazzzzzer.png');
        this.load.image('tire_p_A_1', 'sprites/tire_p_A_1.png');
        this.load.spritesheet('HP', 'sprites/barre_vie.png',
            { frameWidth: 1300, frameHeight: 200 });

        //this.load.spritesheet('perso','sprites/test_perso.png',
        //        { frameWidth: 192, frameHeight: 192 });
    }

    create() {

        //input=this.input;
        const carteDuNiveau = this.add.tilemap("partie_1");
        const tileset = carteDuNiveau.addTilesetImage("test", "phaser_assets");
        const base = carteDuNiveau.createLayer('map', tileset);
        base.setCollisionByProperty({ estSolide: true });
        this.player = this.physics.add.sprite(104 * 64, 70 * 64, 'perso');
        this.physics.add.collider(this.player, base);
        this.cameras.main.zoom = 0.2;
        //this.cameras.main.startFollow(this.player);
        this.clavier = this.input.keyboard.addKeys('Q,D,S,E,SPACE,SHIFT');
        this.vie = this.add.sprite(-800, -600, 'HP').setScale(1.8).setScrollFactor(0);
        this.tir_player = this.physics.add.group()
        this.cameras.main.centerOn(this.player.x, this.player.y)


        this.input.on('pointerdown', (pointer) => {

            isLeftButtonDown = true;

        });

        this.input.on('pointerup', (pointer) => {

            isLeftButtonDown = false;

        });



        this.input.on('pointerdown', (pointer) => {
            if (pointer.rightButtonDown()) {
                isRightButtonDown = true;
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (!pointer.rightButtonDown()) {
                isRightButtonDown = false;
            }
        });

        /////////////////////////////////ASCENSEUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.ascenseur_1 = this.physics.add.image(20 * 64, 69.5 * 64, 'ascensseur')
            .setImmovable(true)
        this.ascenseur_1.body.setAllowGravity(false);
        this.physics.add.collider(this.ascenseur_1, this.player);
        this.ascenseur_2 = this.physics.add.image(150 * 64, 75.5 * 64, 'ascensseur')
            .setImmovable(true)
        this.ascenseur_2.body.setAllowGravity(false);
        this.physics.add.collider(this.ascenseur_2, this.player);
        this.ascenseur_3 = this.physics.add.image(169 * 64, 145.5 * 64, 'ascensseur')
            .setImmovable(true)
        this.ascenseur_3.body.setAllowGravity(false);
        this.physics.add.collider(this.ascenseur_3, this.player);

        this.HBA1 = this.physics.add.sprite(this.ascenseur_1.x, this.ascenseur_1.y - 128, "hb_ascensseur")
        this.HBA2 = this.physics.add.sprite(this.ascenseur_2.x, this.ascenseur_2.y - 128, "hb_ascensseur")
        this.HBA3 = this.physics.add.sprite(this.ascenseur_3.x, this.ascenseur_3.y - 128, "hb_ascensseur")

        this.physics.add.overlap(this.player, this.HBA1, this.ascenseur_1_move, null, this);
        this.physics.add.collider(this.ascenseur_1, this.base);
        this.physics.add.collider(this.ascenseur_1, this.HBA1);
        this.HBA1.body.allowGravity = true;

        this.physics.add.overlap(this.player, this.HBA2, this.ascenseur_2_move, null, this);
        this.physics.add.collider(this.ascenseur_2, this.base);
        this.physics.add.collider(this.ascenseur_2, this.HBA2);
        this.HBA2.body.allowGravity = true;

        this.physics.add.overlap(this.player, this.HBA3, this.ascenseur_3_move, null, this);
        this.physics.add.collider(this.ascenseur_3, this.base);
        this.physics.add.collider(this.ascenseur_3, this.HBA3);
        this.HBA3.body.allowGravity = true;



        /////////////////////////////////PLATEFORME\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.plateforme_1 = this.physics.add.image(142 * 64, 121.5 * 64, 'plateforme')
            .setImmovable(true)
        //.setVelocity(100, -100);
        this.plateforme_1.body.setAllowGravity(false);
        this.plateforme_2 = this.physics.add.image(56 * 64, 124.5 * 64, 'plateforme')
            .setImmovable(true)
        //.setVelocity(100, -100);
        this.plateforme_2.body.setAllowGravity(false);
        this.plateforme_allez_a_gauche(this.plateforme_1)
        this.plateforme_allez_a_droite(this.plateforme_2)



        this.projectile_tourelle = this.physics.add.group()



        this.tourelle = this.physics.add.group()
        //salle boss
        this.tourelle.create(148 * 64, 118.5 * 64, 'tourelle');

        this.tourelle.create(136 * 64, 118.5 * 64, 'tourelle');
        this.tourelle.create(121 * 64, 118.5 * 64, 'tourelle');
        this.tourelle.create(104 * 64, 118.5 * 64, 'tourelle');
        this.tourelle.create(82 * 64, 118.5 * 64, 'tourelle');
        this.tourelle.create(68 * 64, 118.5 * 64, 'tourelle');
        this.tourelle.create(52 * 64, 118.5 * 64, 'tourelle');
        //// première salle + elevator
        this.tourelle.create(104 * 64, 11.5 * 64, 'tourelle');
        this.tourelle.create(79 * 64, 56.5 * 64, 'tourelle');
        this.tourelle.create(63 * 64, 56.5 * 64, 'tourelle');
        this.tourelle.create(46 * 64, 56.5 * 64, 'tourelle');
        this.tourelle.create(25 * 64, 87.5 * 64, 'tourelle');
        this.tourelle.create(25 * 64, 109.5 * 64, 'tourelle');
        this.tourelle.create(25 * 64, 139.5 * 64, 'tourelle');
        this.tourelle.create(14 * 64, 139.5 * 64, 'tourelle');
        //salle générateur
        this.tourelle.create(65 * 64, 169.5 * 64, 'tourelle');
        this.tourelle.create(58 * 64, 177.5 * 64, 'tourelle');
        this.tourelle.create(65 * 64, 185.5 * 64, 'tourelle');
        this.tourelle.create(72 * 64, 177.5 * 64, 'tourelle');
        this.tourelle.create(102 * 64, 177.5 * 64, 'tourelle');
        this.tourelle.create(109 * 64, 185.5 * 64, 'tourelle');
        this.tourelle.create(109 * 64, 169.5 * 64, 'tourelle');
        this.tourelle.create(116 * 64, 177.5 * 64, 'tourelle');




        this.tourelle.getChildren()[0].vieTourelle = 4;
        this.tourelle.getChildren()[1].vieTourelle = 4;
        this.tourelle.getChildren()[2].vieTourelle = 4;
        this.tourelle.getChildren()[3].vieTourelle = 4;
        this.tourelle.getChildren()[4].vieTourelle = 4;
        this.tourelle.getChildren()[5].vieTourelle = 4;
        this.tourelle.getChildren()[6].vieTourelle = 4;
        this.tourelle.getChildren()[7].vieTourelle = 4;
        this.tourelle.getChildren()[8].vieTourelle = 4;
        this.tourelle.getChildren()[9].vieTourelle = 4;
        this.tourelle.getChildren()[10].vieTourelle = 4;
        this.tourelle.getChildren()[11].vieTourelle = 4;
        this.tourelle.getChildren()[12].vieTourelle = 4;
        this.tourelle.getChildren()[13].vieTourelle = 4;
        this.tourelle.getChildren()[14].vieTourelle = 4;


        this.physics.add.collider(this.tourelle, base);

        Phaser.Actions.Call(this.tourelle.getChildren(), function (fixe) {
            fixe.body.allowGravity = false;
        }, this);
        this.physics.add.collider(this.projectile_tourelle, base, this.destroylaser, null, this)
        this.physics.add.collider(this.projectile_tourelle, this.player, this.toucheplayer, null, this)
        this.physics.add.collider(this.tir_player, base, this.destroylaser, null, this)
        this.physics.add.overlap(this.tir_player, this.tourelle.getChildren(), this.tourelleDegats, null, this)

        this.arme = this.physics.add.sprite(91 * 64, 127 * 64, 'arme1');
        this.arme.setOrigin(0.5, 0.17);
        this.arme.setScale(1)
        //this.aimAngle = 0;
        //this.leftArm.play('gun-arm-idle');

        this.arme.body.allowGravity = false;


        //this.physics.input.on('pointermove', ({worldX, worldY}) => {
        //    // Calculate the angle between the player and the world x/y of the mouse, and offset it by Pi/2
        //    this.aimAngle = (pMath.Angle.Between(this.x, this.y, worldX, worldY) - Math.PI / 2);

        //    // Assign the rotation (in radians) to arms
        //    this.arme.setRotation(this.aimAngle);
        //})



        this.anims.create({
            key: 'HP11',
            frames: this.anims.generateFrameNumbers('HP', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP10',
            frames: this.anims.generateFrameNumbers('HP', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP9',
            frames: this.anims.generateFrameNumbers('HP', { start: 2, end: 2 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP8',
            frames: this.anims.generateFrameNumbers('HP', { start: 3, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP7',
            frames: this.anims.generateFrameNumbers('HP', { start: 4, end: 4 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP6',
            frames: this.anims.generateFrameNumbers('HP', { start: 5, end: 5 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP5',
            frames: this.anims.generateFrameNumbers('HP', { start: 6, end: 6 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP4',
            frames: this.anims.generateFrameNumbers('HP', { start: 7, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP3',
            frames: this.anims.generateFrameNumbers('HP', { start: 8, end: 8 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP2',
            frames: this.anims.generateFrameNumbers('HP', { start: 9, end: 9 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP1',
            frames: this.anims.generateFrameNumbers('HP', { start: 10, end: 10 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'HP0',
            frames: this.anims.generateFrameNumbers('HP', { start: 11, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
    }

    update() {

        if (isLeftButtonDown && this.canshootA1) {
            this.tir_player.create(this.player.x, this.player.y, "tire_p_A_1").setVelocityX((this.input.activePointer.worldX - this.player.x) * 10).setVelocityY((this.input.activePointer.worldY - this.player.y) * 10)
            this.canshootA1 = false
            setTimeout(() => {
                this.canshootA1 = true
            }, 30);
        }

        let angle = Phaser.Math.Angle.Between(this.arme.x, this.arme.y, this.input.activePointer.worldX, this.input.activePointer.worldY);
        this.arme.setRotation(angle);


        const distance1 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[0].x, this.tourelle.getChildren()[0].y, this.player.x, this.player.y);
        const distance2 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[1].x, this.tourelle.getChildren()[1].y, this.player.x, this.player.y);
        const distance3 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[2].x, this.tourelle.getChildren()[2].y, this.player.x, this.player.y);
        const distance4 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[3].x, this.tourelle.getChildren()[3].y, this.player.x, this.player.y);
        const distance5 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[4].x, this.tourelle.getChildren()[4].y, this.player.x, this.player.y);
        const distance6 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[5].x, this.tourelle.getChildren()[5].y, this.player.x, this.player.y);
        const distance7 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[6].x, this.tourelle.getChildren()[6].y, this.player.x, this.player.y);
        const distance8 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[7].x, this.tourelle.getChildren()[7].y, this.player.x, this.player.y);
        const distance9 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[8].x, this.tourelle.getChildren()[8].y, this.player.x, this.player.y);
        const distance10 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[9].x, this.tourelle.getChildren()[9].y, this.player.x, this.player.y);
        const distance11 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[10].x, this.tourelle.getChildren()[10].y, this.player.x, this.player.y);
        const distance12 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[11].x, this.tourelle.getChildren()[11].y, this.player.x, this.player.y);
        const distance13 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[12].x, this.tourelle.getChildren()[12].y, this.player.x, this.player.y);
        const distance14 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[13].x, this.tourelle.getChildren()[13].y, this.player.x, this.player.y);
        const distance15 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[14].x, this.tourelle.getChildren()[14].y, this.player.x, this.player.y);
        //const distance16 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[15].x, this.tourelle.getChildren()[15].y, this.player.x, this.player.y);


        if (distance1 < 3000) {
            if (this.canshoot == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[0].x, this.tourelle.getChildren()[0].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[0].x).setVelocityY(this.player.y - this.tourelle.getChildren()[0].y).body.setAllowGravity(false)
                this.canshoot = false
                setTimeout(() => {
                    this.canshoot = true
                }, 2500);
            }
        }

        if (distance2 < 3000) {
            if (this.canshoot2 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[1].x, this.tourelle.getChildren()[1].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[1].x).setVelocityY(this.player.y - this.tourelle.getChildren()[1].y).body.setAllowGravity(false)
                this.canshoot2 = false
                setTimeout(() => {
                    this.canshoot2 = true
                }, 1000);
            }
        }

        if (distance3 < 3000) {
            if (this.canshoot3 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[2].x, this.tourelle.getChildren()[2].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[2].x).setVelocityY(this.player.y - this.tourelle.getChildren()[2].y).body.setAllowGravity(false)
                this.canshoot3 = false
                setTimeout(() => {
                    this.canshoot3 = true
                }, 2000);
            }
        }

        if (distance4 < 3000) {
            if (this.canshoot4 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[3].x, this.tourelle.getChildren()[3].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[3].x).setVelocityY(this.player.y - this.tourelle.getChildren()[3].y).body.setAllowGravity(false)
                this.canshoot4 = false
                setTimeout(() => {
                    this.canshoot4 = true
                }, 2200);
            }
        }

        if (distance5 < 3000) {
            if (this.canshoot5 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[4].x, this.tourelle.getChildren()[4].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[4].x).setVelocityY(this.player.y - this.tourelle.getChildren()[4].y).body.setAllowGravity(false)
                this.canshoot5 = false
                setTimeout(() => {
                    this.canshoot5 = true
                }, 1900);
            }
        }

        if (distance6 < 3000) {
            if (this.canshoot6 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[5].x, this.tourelle.getChildren()[5].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[5].x).setVelocityY(this.player.y - this.tourelle.getChildren()[5].y).body.setAllowGravity(false)
                this.canshoot6 = false
                setTimeout(() => {
                    this.canshoot6 = true
                }, 2400);
            }
        }

        if (distance7 < 3000) {
            if (this.canshoot8 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[6].x, this.tourelle.getChildren()[6].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[6].x).setVelocityY(this.player.y - this.tourelle.getChildren()[6].y).body.setAllowGravity(false)
                this.canshoot8 = false
                setTimeout(() => {
                    this.canshoot8 = true
                }, 3200);
            }
        }

        if (distance8 < 300) {
            if (this.canshoot9 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[7].x, this.tourelle.getChildren()[7].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[7].x).setVelocityY(this.player.y - this.tourelle.getChildren()[7].y).body.setAllowGravity(false)
                this.canshoot9 = false
                setTimeout(() => {
                    this.canshoot9 = true
                }, 3000);
            }
        }

        if (distance9 < 1500) {
            if (this.canshoot10 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[8].x, this.tourelle.getChildren()[8].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[8].x).setVelocityY(this.player.y - this.tourelle.getChildren()[8].y).body.setAllowGravity(false)
                this.canshoot10 = false
                setTimeout(() => {
                    this.canshoot10 = true
                }, 3000);
            }
        }

        if (distance10 < 1500) {
            if (this.canshoot11 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[9].x, this.tourelle.getChildren()[9].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[9].x).setVelocityY(this.player.y - this.tourelle.getChildren()[9].y).body.setAllowGravity(false)
                this.canshoot11 = false
                setTimeout(() => {
                    this.canshoot11 = true
                }, 2500);
            }
        }

        if (distance11 < 1500) {
            if (this.canshoot12 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[10].x, this.tourelle.getChildren()[10].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[10].x).setVelocityY(this.player.y - this.tourelle.getChildren()[10].y).body.setAllowGravity(false)
                this.canshoot12 = false
                setTimeout(() => {
                    this.canshoot12 = true
                }, 2200);
            }
        }

        if (distance12 < 900) {
            if (this.canshoot13 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[11].x, this.tourelle.getChildren()[11].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[11].x).setVelocityY(this.player.y - this.tourelle.getChildren()[11].y).body.setAllowGravity(false)
                this.canshoot13 = false
                setTimeout(() => {
                    this.canshoot13 = true
                }, 2500);
            }
        }

        if (distance13 < 900) {
            if (this.canshoot14 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[12].x, this.tourelle.getChildren()[12].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[12].x).setVelocityY(this.player.y - this.tourelle.getChildren()[12].y).body.setAllowGravity(false)
                this.canshoot14 = false
                setTimeout(() => {
                    this.canshoot14 = true
                }, 2500);
            }
        }

        if (distance14 < 900) {
            if (this.canshoot15 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[13].x, this.tourelle.getChildren()[13].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[13].x).setVelocityY(this.player.y - this.tourelle.getChildren()[13].y).body.setAllowGravity(false)
                this.canshoot15 = false
                setTimeout(() => {
                    this.canshoot15 = true
                }, 2500);
            }
        }

        if (distance15 < 900) {
            if (this.canshoot16 == true) {
                this.projectile_tourelle.create(this.tourelle.getChildren()[14].x, this.tourelle.getChildren()[14].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[14].x).setVelocityY(this.player.y - this.tourelle.getChildren()[14].y).body.setAllowGravity(false)
                this.canshoot16 = false
                setTimeout(() => {
                    this.canshoot16 = true
                }, 2500);
            }
        }
        this.arme.x = this.player.x
        this.arme.y = this.player.y


        //if (this.clavier.E.isDown){

        //}
        if (this.player)

            if (this.clavier.Q.isDown) {

                this.player.setVelocityX(-600);
                //this.HB.x=this.player.x-32;
                //this.HB.y=this.player.y;
            }
            else if (this.clavier.D.isDown) {
                this.player.setVelocityX(600);
                //this.HB.x=this.player.x+32;
                //this.HB.y=this.player.y;
            }
            else {
                this.player.setVelocityX(0)
                //this.player.anims.play('idle', true);
            }
        if (this.clavier.SPACE.isDown) {
            if (this.player.body.blocked.down) {
                this.player.setVelocityY(-1200);

            }
        }
        if (this.clavier.S.isDown) {
            this.player.setVelocityY(800);
        }

        if (this.player.body.velocity.y >= 900) {
            this.player.setVelocityY(800)
        }





        if (HP == 11) {
            this.vie.anims.play("HP11", true);
        }
        if (HP == 10) {
            this.vie.anims.play("HP10", true);
        }
        if (HP == 9) {
            this.vie.anims.play("HP9", true);
        }
        if (HP == 8) {
            this.vie.anims.play("HP8", true);
        }
        if (HP == 7) {
            this.vie.anims.play("HP7", true);
        }
        if (HP == 6) {
            this.vie.anims.play("HP6", true);
        }
        if (HP == 5) {
            this.vie.anims.play("HP5", true);
        }
        if (HP == 4) {
            this.vie.anims.play("HP4", true);
        }
        if (HP == 3) {
            this.vie.anims.play("HP3", true);
        }
        if (HP == 2) {
            this.vie.anims.play("HP2", true);
        }
        if (HP == 1) {
            this.vie.anims.play("HP1", true);
        }
        if (HP == 0) {
            this.vie.anims.play("HP0", true);
        }
        const distance_souris = Phaser.Math.Distance.Between(this.input.activePointer.worldX, this.input.activePointer.worldY, this.player.x, this.player.y);
        distanceX = this.input.activePointer.worldX - this.player.x
        distanceY = this.input.activePointer.worldY - this.player.y
        if (isRightButtonDown) {
            if (distance_souris < 650) {
                this.cameras.main.centerOn(this.player.x + distanceX, this.player.y + distanceY)
            }
        }else{
            this.cameras.main.centerOn(this.player.x, this.player.y)
        }

    }


    ascenseur_1_move() {
        if (this.clavier.E.isDown && this.ascenseur_1.body.velocity.y == 0) {
            console.log(this.ascenseur_1.y)
            if ((this.ascenseur_1.y <= 7300) && (this.ascenseur_1.y >= 4300)) {
                this.ascenseur_1.setVelocityY(400);
                setTimeout(() => {
                    this.ascenseur_1.setVelocityY(0);
                }, 19385);
            }
            else if (this.ascenseur_1.y <= 12300 && this.ascenseur_1.y >= 7300) {
                this.ascenseur_1.setVelocityY(-400);
                setTimeout(() => {
                    this.ascenseur_1.setVelocityY(0);
                }, 19385);
            }
        }
    }

    ascenseur_2_move() {
        if (this.clavier.E.isDown && this.ascenseur_2.body.velocity.y == 0) {
            console.log(this.ascenseur_2.y)
            if ((this.ascenseur_2.y >= 4800) && (this.ascenseur_2.y <= 6000)) {
                this.ascenseur_2.setVelocityY(400);
                setTimeout(() => {
                    this.ascenseur_2.setVelocityY(0);
                }, 6250);
            }
            else if (this.ascenseur_2.y <= 12300 && this.ascenseur_2.y >= 7300) {
                this.ascenseur_2.setVelocityY(-400);
                setTimeout(() => {
                    this.ascenseur_2.setVelocityY(0);
                }, 6250);
            }
        }
    }


    plateforme_allez_a_droite(plateforme) {
        plateforme.setVelocityX(500);
        setTimeout(() => {
            this.plateforme_allez_a_gauche(plateforme)
        }, 12000);
    }



    plateforme_allez_a_gauche(plateforme) {
        plateforme.setVelocityX(-500);
        setTimeout(() => {
            this.plateforme_allez_a_droite(plateforme)
        }, 12000);
    }


    ascenseur_3_move() {
        if (this.clavier.E.isDown && this.ascenseur_2.body.velocity.y == 0) {
            this.ascenseur_3.setVelocityX(500);
            setTimeout(() => {
                this.ascenseur_3.setVelocityX(0)
                this.last_plateforme_p1W()
            }, 3105);
        }
    }

    last_plateforme_p1W() {
        this.ascenseur_3.setVelocityY(0);
        setTimeout(() => {
            this.last_plateforme_p2()
        }, 2000);
    }

    last_plateforme_p2() {
        this.ascenseur_3.setVelocityY(-500);
        setTimeout(() => {
            this.last_plateforme_p2W()
        }, 4000);
    }

    last_plateforme_p2W() {
        this.ascenseur_3.setVelocityY(0);
        setTimeout(() => {
            this.ascenseur_3.setVelocityY(0)
            this.last_plateforme_p3()
        }, 4200);
    }

    last_plateforme_p3() {
        this.ascenseur_3.setVelocityX(500);
        setTimeout(() => {
            this.ascenseur_3.setVelocityY(0);
        }, 12000);
    }

    destroylaser(laser, collide) {
        laser.destroy()
    }

    toucheplayer(laser, player) {
        player.destroy()
        HP -= 1
    }

    tourelleDegats(tir_player,tourelle){
        tir_player.destroy()
        tourelle.HP -= 1
        if(tourelle.HP <= 0){
            tourelle.setVisible(false)
        }
    }

}