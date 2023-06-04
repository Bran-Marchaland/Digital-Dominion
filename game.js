var HP = 11;
var input;
var isRightButtonDown = false;
var isLeftButtonDown = false;
var distanceY;
var distanceX;
var surchauffe = 0;
var recharge = 0;
var PT2 = 2;
var rechbouclier = true;
var usebouclier = false;
var invinssible = false;
var cap1 = false;
var rechCap1 = 0;
/// idée musique https://www.youtube.com/watch?v=GMG-SkU0Cis&list=RDMMAqYYvGz0eh4&index=23

class partie_1 extends Phaser.Scene {
    constructor() {
        super('partie_1');
        this.canshootA1 = true
        this.isLeftButtonDown = false;

    }

    preload() {
        this.load.tilemapTiledJSON("partie_1", "maps/partie_1.json");
        this.load.image("phaser_assets", "maps/test.png");
        this.load.image('perso', 'sprites/test_perso.png');
        this.load.image('ascensseur', 'maps/ascensseur.png');
        this.load.image('heal', 'sprites/heal.png');
        this.load.image('hb_ascensseur', 'maps/hb_ascensseur.png');
        this.load.image('plateforme', 'maps/plateforme.png');
        this.load.image('arme1', 'sprites/arme_1.png');
        this.load.image('tourelle', 'sprites/tourelle.png');
        this.load.image('porteS1', 'sprites/porte_simple_1.png');
        this.load.image('porteS2', 'sprites/porte_simple_2.png');
        this.load.image('TP1', 'maps/TP.png');
        this.load.image('bouclier', 'sprites/bouclier.png');
        this.load.image('generateur', 'sprites/generateur.png');
        this.load.image('HBZM', 'sprites/hb_z_m.png');
        this.load.image('porteL', 'sprites/porte_lourd.png');
        this.load.image('lazzzzzer', 'sprites/lazzzzzer.png');
        this.load.image('tire_p_A_1', 'sprites/tire_p_A_1.png');
        this.load.spritesheet('HP', 'sprites/barre_vie.png',
            { frameWidth: 1300, frameHeight: 200 });
        this.load.spritesheet('surchauffe', 'sprites/surchauffe.png',
            { frameWidth: 30, frameHeight: 60 });


        this.load.setPath('sound');
        this.load.audio('B1', 'DBateuse_3.mp3');
        this.load.audio('B2', 'MBateuse_3.mp3');
        this.load.audio('B3', 'FBateuse_3.mp3');
        this.load.audio('CU', 'coup_unique.mp3');
        this.load.audio('M', 'marche.mp3');
        this.load.audio('PP', 'propulsion.mp3');
    }

    create() {

        this.sonTT = this.sound.add('CU');
        this.sonB = this.sound.add('B2');
        this.sonBF = this.sound.add('B3');
        this.sonMarche = this.sound.add('M');
        this.sonPropulsion = this.sound.add('PP');


        //input=this.input;
        const carteDuNiveau = this.add.tilemap("partie_1");
        const tileset = carteDuNiveau.addTilesetImage("test", "phaser_assets");
        const base = carteDuNiveau.createLayer('map', tileset);
        base.setCollisionByProperty({ estSolide: true });
        this.player = this.physics.add.sprite(194 * 64, 109 * 64, 'perso');
        this.physics.add.collider(this.player, base);
        this.cameras.main.zoom = 0.2;
        //this.cameras.main.startFollow(this.player);
        this.clavier = this.input.keyboard.addKeys('Q,D,S,E,R,F,SPACE,SHIFT');
        this.vie = this.add.sprite(-800, -600, 'HP').setScale(1.8).setScrollFactor(0);
        this.tir_player = this.physics.add.group({ gravity: false })
        this.cameras.main.centerOn(this.player.x, this.player.y)
        this.surchauffeV = this.add.sprite(-1650, 1000, 'surchauffe').setScale(12.8).setScrollFactor(0);
        this.surchauffeV.depth = 1000
        this.vie.depth = 1000
        this.sonB.play();
        this.sonMarche.play();
        this.sonB.pause();
        this.sonMarche.pause();
        this.sonB.loop = true;
        this.sonMarche.loop = true;
        this.sonB.volume = 0.9;
        this.sonB.volume = 10;




        this.input.on('pointerdown', (pointer) => {
            if (pointer.rightButtonDown()) {
                isRightButtonDown = true;
            }
            if (pointer.leftButtonDown()) {
                isLeftButtonDown = true;
                if(surchauffe < 100){
                this.sonB.resume();
                }
            
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (!pointer.rightButtonDown()) {
                isRightButtonDown = false;
            }
            if (!pointer.leftButtonDown()) {
                isLeftButtonDown = false;
                this.sonB.pause();
                this.sonBF.play();
            }
        });

        this.heal = this.physics.add.group()
        this.heal.create(105 * 64, 74.5 * 64, 'heal').setScale(1.5);
        this.heal.create(123 * 64, 138.5 * 64, 'heal').setScale(1.5);
        this.heal.create(160 * 64, 144.5 * 64, 'heal').setScale(1.5);
        this.heal.create(133 * 64, 83.5 * 64, 'heal').setScale(1.5);
        this.heal.create(37 * 64, 185.5 * 64, 'heal').setScale(1.5);

        this.physics.add.overlap(this.player, this.heal, function (player, heal) {
            if (HP < 11) {
                HP = 11
                heal.destroy()
            }
        }, null, this)




        this.GRPHBZM = this.physics.add.group({ immovable: true, allowGravity: false })
        this.HBZM = carteDuNiveau.getObjectLayer("robot");
        this.HBZM.objects.forEach(coord => {
            this.GRPHBZM.create(coord.x + 32, coord.y - 32, "HBZM");
        });


        /////////////////////////////////GENERATEUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.generateur_1 = this.physics.add.image(157 * 64, 7 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_1.depth = 1
        this.generateur_1.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_1, this.player);
        this.generateur_1.vieGenerateur = 20;

        this.generateur_2 = this.physics.add.image(96 * 64, 81.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_2.depth = 1
        this.generateur_2.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_2, this.player);
        this.generateur_2.vieGenerateur = 20;

        this.generateur_3 = this.physics.add.image(48 * 64, 94.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_3.depth = 1
        this.generateur_3.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_3, this.player);
        this.generateur_3.vieGenerateur = 20;

        this.generateur_4 = this.physics.add.image(61 * 64, 172.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_4.depth = 1
        this.generateur_4.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_4, this.player);
        this.generateur_4.vieGenerateur = 20;

        this.generateur_5 = this.physics.add.image(70 * 64, 172.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_5.depth = 1
        this.generateur_5.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_5, this.player);
        this.generateur_5.vieGenerateur = 20;

        this.generateur_6 = this.physics.add.image(61 * 64, 182.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_6.depth = 1
        this.generateur_6.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_6, this.player);
        this.generateur_6.vieGenerateur = 20;

        this.generateur_7 = this.physics.add.image(70 * 64, 182.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_7.depth = 1
        this.generateur_7.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_7, this.player);
        this.generateur_7.vieGenerateur = 20;

        this.generateur_8 = this.physics.add.image(105 * 64, 172.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_8.depth = 1
        this.generateur_8.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_8, this.player);
        this.generateur_8.vieGenerateur = 20;

        this.generateur_9 = this.physics.add.image(114 * 64, 172.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_9.depth = 1
        this.generateur_9.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_9, this.player);
        this.generateur_9.vieGenerateur = 20;

        this.generateur_10 = this.physics.add.image(105 * 64, 182.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_10.depth = 1
        this.generateur_10.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_10, this.player);
        this.generateur_10.vieGenerateur = 20;

        this.generateur_11 = this.physics.add.image(114 * 64, 182.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_11.depth = 1
        this.generateur_11.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_11, this.player);
        this.generateur_11.vieGenerateur = 20;

        /////////////////////////////////PORTE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.porte_1 = this.physics.add.image(105 * 64, 41 * 64, 'porteS1')
            .setImmovable(true)
        this.porte_1.body.setAllowGravity(false);
        this.physics.add.collider(this.porte_1, this.player);

        this.porte_2 = this.physics.add.image(92 * 64, 116 * 64, 'porteL')
            .setImmovable(true)
        this.porte_2.body.setAllowGravity(false);
        this.physics.add.collider(this.porte_2, this.player);




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

        /////////////////////////////////TP\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        this.tp = this.physics.add.group({ allowGravity: false, });
        this.tp1 = this.physics.add.image(197 * 64, 111 * 64, 'TP1');
        this.tp.add(this.tp1)
        this.physics.add.overlap(this.player, this.tp1, this.phase2, null, this);


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



        this.projectile_tourelle = this.physics.add.group();

        /////////////////////////////////ENEMIES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.robot = this.physics.add.group({ immovable: true })
        this.robot.create(53 * 64, 39.5 * 64, 'tourelle').setVelocityX(-400);         //1
        this.robot.create(104 * 64, 25.5 * 64, 'tourelle').setVelocityX(-200);         //2
        this.robot.create(133 * 64, 13.5 * 64, 'tourelle').setVelocityX(-100);         //3
        this.robot.create(154 * 64, 13.5 * 64, 'tourelle').setVelocityX(100);         //4
        this.robot.create(147 * 64, 39.5 * 64, 'tourelle').setVelocityX(-100);         //5
        this.robot.create(98 * 64, 39.5 * 64, 'tourelle').setVelocityX(-100);         //6
        this.robot.create(89 * 64, 104.5 * 64, 'tourelle').setVelocityX(-100);         //7
        this.robot.create(107 * 64, 102.5 * 64, 'tourelle').setVelocityX(-100);         //8
        this.robot.create(40 * 64, 176.5 * 64, 'tourelle').setVelocityX(300);         //9
        this.robot.create(50 * 64, 176.5 * 64, 'tourelle').setVelocityX(-100);         //10
        this.robot.create(73 * 64, 189.5 * 64, 'tourelle').setVelocityX(-100);         //11
        this.robot.create(99 * 64, 189.5 * 64, 'tourelle').setVelocityX(-100);         //12
        this.robot.create(80 * 64, 176.5 * 64, 'tourelle').setVelocityX(-100);         //13
        this.robot.create(93 * 64, 176.5 * 64, 'tourelle').setVelocityX(-100);         //14



        this.tourelle = this.physics.add.group({ immovable: true })
        //salle boss
        this.tourelle.create(148 * 64, 118.5 * 64, 'tourelle');         //0

        this.tourelle.create(136 * 64, 118.5 * 64, 'tourelle');         //1
        this.tourelle.create(121 * 64, 118.5 * 64, 'tourelle');         //2
        this.tourelle.create(104 * 64, 118.5 * 64, 'tourelle');         //3
        this.tourelle.create(82 * 64, 118.5 * 64, 'tourelle');          //4
        this.tourelle.create(68 * 64, 118.5 * 64, 'tourelle');          //5 
        this.tourelle.create(52 * 64, 118.5 * 64, 'tourelle');          //6
        //// première salle + elevator
        this.tourelle.create(104 * 64, 11.5 * 64, 'tourelle');          //7
        this.tourelle.create(79 * 64, 56.5 * 64, 'tourelle');           //8
        this.tourelle.create(63 * 64, 56.5 * 64, 'tourelle');           //9
        this.tourelle.create(46 * 64, 56.5 * 64, 'tourelle');           //10
        this.tourelle.create(25 * 64, 87.5 * 64, 'tourelle');           //11
        this.tourelle.create(25 * 64, 109.5 * 64, 'tourelle');         //12
        this.tourelle.create(25 * 64, 139.5 * 64, 'tourelle');         //13
        this.tourelle.create(14 * 64, 139.5 * 64, 'tourelle');         //14
        //salle générateur
        this.tourelle.create(65 * 64, 169.5 * 64, 'tourelle');         //15
        this.tourelle.create(58 * 64, 177.5 * 64, 'tourelle');         //16
        this.tourelle.create(65 * 64, 185.5 * 64, 'tourelle');         //17
        this.tourelle.create(72 * 64, 177.5 * 64, 'tourelle');         //18
        this.tourelle.create(102 * 64, 177.5 * 64, 'tourelle');         //19
        this.tourelle.create(109 * 64, 185.5 * 64, 'tourelle');         //20
        this.tourelle.create(109 * 64, 169.5 * 64, 'tourelle');         //21
        this.tourelle.create(116 * 64, 177.5 * 64, 'tourelle');         //22
        //mobile
        this.tourelle.create(145 * 64, 122.5 * 64, 'tourelle');         //23
        this.tourelle.create(145 * 64, 123.5 * 64, 'tourelle');         //24
        this.tourelle.create(145 * 64, 122.5 * 64, 'tourelle');         //25
        this.tourelle.create(145 * 64, 123.5 * 64, 'tourelle');         //26
        //reste
        this.tourelle.create(96 * 64, 107.5 * 64, 'tourelle');         //27
        this.tourelle.create(87 * 64, 107.5 * 64, 'tourelle');         //28
        this.tourelle.create(125 * 64, 97.5 * 64, 'tourelle');         //29
        this.tourelle.create(65 * 64, 100.5 * 64, 'tourelle');         //30

        this.tourelle.create(134 * 64, 90.5 * 64, 'tourelle');         //31
        this.tourelle.create(105 * 64, 90.5 * 64, 'tourelle');         //32
        this.tourelle.create(79 * 64, 90.5 * 64, 'tourelle');         //33
        this.tourelle.create(54 * 64, 90.5 * 64, 'tourelle');         //34
        this.tourelle.create(124 * 64, 85.5 * 64, 'tourelle');         //35
        this.tourelle.create(94.5 * 64, 85.5 * 64, 'tourelle');         //36
        this.tourelle.create(112 * 64, 79.5 * 64, 'tourelle');         //37
        this.tourelle.create(103 * 64, 79.5 * 64, 'tourelle');         //38

        this.tourelle.getChildren()[0].vieTourelle = 4;
        this.tourelle.getChildren()[0].canshoot = true;
        this.tourelle.getChildren()[1].vieTourelle = 4;
        this.tourelle.getChildren()[1].canshoot = true;
        this.tourelle.getChildren()[2].vieTourelle = 4;
        this.tourelle.getChildren()[2].canshoot = true;
        this.tourelle.getChildren()[3].vieTourelle = 4;
        this.tourelle.getChildren()[3].canshoot = true;
        this.tourelle.getChildren()[4].vieTourelle = 4;
        this.tourelle.getChildren()[4].canshoot = true;
        this.tourelle.getChildren()[5].vieTourelle = 4;
        this.tourelle.getChildren()[5].canshoot = true;
        this.tourelle.getChildren()[6].vieTourelle = 4;
        this.tourelle.getChildren()[6].canshoot = true;
        this.tourelle.getChildren()[7].vieTourelle = 4;
        this.tourelle.getChildren()[7].canshoot = true;
        this.tourelle.getChildren()[8].vieTourelle = 4;
        this.tourelle.getChildren()[8].canshoot = true;
        this.tourelle.getChildren()[9].vieTourelle = 4;
        this.tourelle.getChildren()[9].canshoot = true;
        this.tourelle.getChildren()[10].vieTourelle = 4;
        this.tourelle.getChildren()[10].canshoot = true;
        this.tourelle.getChildren()[11].vieTourelle = 4;
        this.tourelle.getChildren()[11].canshoot = true;
        this.tourelle.getChildren()[12].vieTourelle = 4;
        this.tourelle.getChildren()[12].canshoot = true;
        this.tourelle.getChildren()[13].vieTourelle = 4;
        this.tourelle.getChildren()[13].canshoot = true;
        this.tourelle.getChildren()[14].vieTourelle = 4;
        this.tourelle.getChildren()[14].canshoot = true;
        this.tourelle.getChildren()[15].vieTourelle = 4;
        this.tourelle.getChildren()[15].canshoot = true;
        this.tourelle.getChildren()[16].vieTourelle = 4;
        this.tourelle.getChildren()[16].canshoot = true;
        this.tourelle.getChildren()[17].vieTourelle = 4;
        this.tourelle.getChildren()[17].canshoot = true;
        this.tourelle.getChildren()[18].vieTourelle = 4;
        this.tourelle.getChildren()[18].canshoot = true;
        this.tourelle.getChildren()[19].vieTourelle = 4;
        this.tourelle.getChildren()[19].canshoot = true;
        this.tourelle.getChildren()[20].vieTourelle = 4;
        this.tourelle.getChildren()[20].canshoot = true;
        this.tourelle.getChildren()[21].vieTourelle = 4;
        this.tourelle.getChildren()[21].canshoot = true;
        this.tourelle.getChildren()[22].vieTourelle = 4;
        this.tourelle.getChildren()[22].canshoot = true;
        this.tourelle.getChildren()[23].vieTourelle = 4;
        this.tourelle.getChildren()[23].canshoot = true;
        this.tourelle.getChildren()[24].vieTourelle = 4;
        this.tourelle.getChildren()[24].canshoot = true;
        this.tourelle.getChildren()[25].vieTourelle = 4;
        this.tourelle.getChildren()[25].canshoot = true;
        this.tourelle.getChildren()[26].vieTourelle = 4;
        this.tourelle.getChildren()[26].canshoot = true;
        this.tourelle.getChildren()[27].vieTourelle = 4;
        this.tourelle.getChildren()[27].canshoot = true;
        this.tourelle.getChildren()[28].vieTourelle = 4;
        this.tourelle.getChildren()[28].canshoot = true;
        this.tourelle.getChildren()[29].vieTourelle = 4;
        this.tourelle.getChildren()[29].canshoot = true;
        this.tourelle.getChildren()[30].vieTourelle = 4;
        this.tourelle.getChildren()[30].canshoot = true;
        this.tourelle.getChildren()[31].vieTourelle = 4;
        this.tourelle.getChildren()[31].canshoot = true;
        this.tourelle.getChildren()[32].vieTourelle = 4;
        this.tourelle.getChildren()[32].canshoot = true;
        this.tourelle.getChildren()[33].vieTourelle = 4;
        this.tourelle.getChildren()[33].canshoot = true;
        this.tourelle.getChildren()[34].vieTourelle = 4;
        this.tourelle.getChildren()[34].canshoot = true;
        this.tourelle.getChildren()[35].vieTourelle = 4;
        this.tourelle.getChildren()[35].canshoot = true;
        this.tourelle.getChildren()[36].vieTourelle = 4;
        this.tourelle.getChildren()[36].canshoot = true;
        this.tourelle.getChildren()[37].vieTourelle = 4;
        this.tourelle.getChildren()[37].canshoot = true;
        this.tourelle.getChildren()[38].vieTourelle = 4;
        this.tourelle.getChildren()[38].canshoot = true;
        //this.tourelle.getChildren()[25].vieTourelle = 4;

        this.robot.getChildren()[0].vierobot = 4;
        this.robot.getChildren()[0].canshoot = true;
        this.robot.getChildren()[1].vierobot = 4;
        this.robot.getChildren()[1].canshoot = true;
        this.robot.getChildren()[2].vierobot = 4;
        this.robot.getChildren()[2].canshoot = true;
        this.robot.getChildren()[3].vierobot = 4;
        this.robot.getChildren()[3].canshoot = true;
        this.robot.getChildren()[4].vierobot = 4;
        this.robot.getChildren()[4].canshoot = true;
        this.robot.getChildren()[5].vierobot = 4;
        this.robot.getChildren()[5].canshoot = true;
        this.robot.getChildren()[6].vierobot = 4;
        this.robot.getChildren()[6].canshoot = true;
        this.robot.getChildren()[7].vierobot = 4;
        this.robot.getChildren()[7].canshoot = true;
        this.robot.getChildren()[8].vierobot = 4;
        this.robot.getChildren()[8].canshoot = true;
        this.robot.getChildren()[9].vierobot = 4;
        this.robot.getChildren()[9].canshoot = true;
        this.robot.getChildren()[10].vierobot = 4;
        this.robot.getChildren()[10].canshoot = true;
        this.robot.getChildren()[11].vierobot = 4;
        this.robot.getChildren()[11].canshoot = true;
        this.robot.getChildren()[12].vierobot = 4;
        this.robot.getChildren()[12].canshoot = true;
        this.robot.getChildren()[13].vierobot = 4;
        this.robot.getChildren()[13].canshoot = true;
        /////////////////////////////////COLISION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


        this.physics.world.setBounds(0, 0, 12800, 12800)
        this.physics.add.collider(this.tourelle, base);

        Phaser.Actions.Call(this.tourelle.getChildren(), function (fixe) {
            fixe.body.allowGravity = false;
        }, this);
        this.physics.add.collider(this.projectile_tourelle, base, this.destroylaser, null, this)
        this.physics.add.collider(this.projectile_tourelle, this.player, this.toucheplayer, null, this)
        this.physics.add.collider(this.tir_player, base, this.destroylaser, null, this)
        this.physics.add.collider(this.projectile_tourelle, this.bouclier, this.destroylaser, null, this)
        this.physics.add.collider(this.tir_player, this.ascenseur_1, this.tirSUPP, null, this)
        this.physics.add.collider(this.tir_player, this.ascenseur_2, this.tirSUPP, null, this)
        this.physics.add.collider(this.tir_player, this.ascenseur_3, this.tirSUPP, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_1, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_2, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_3, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_4, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_5, this.DG, null, this)
        this.physics.add.collider(this.robot, base)
        this.physics.add.collider(this.player, this.tp, this.P2, null, this);
        this.physics.add.collider(this.heal, base, this.DG, null, this)
        this.physics.add.overlap(this.robot, this.GRPHBZM, this.MR, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_6, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_7, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_8, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_9, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_10, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_11, this.DG, null, this)
        this.physics.add.collider(this.robot, this.porte_1)

        this.physics.add.collider(this.tir_player, this.porte_1, this.tirSUPP, null, this)
        this.physics.add.collider(this.tir_player, this.porte_2, this.tirSUPP, null, this)
        this.physics.add.collider(this.projectile_tourelle, this.porte_2, this.tirSUPP, null, this)

        this.physics.add.overlap(this.tir_player, this.tourelle, this.tourelleDegats, null, this)
        this.physics.add.overlap(this.tir_player, this.robot, this.robotDegats, null, this)



        this.bouclier = this.physics.add.sprite(91 * 64, 127 * 64, 'bouclier');
        //this.bouclier.disableBody(true)

        this.bouclier.setOrigin(0.5, 0.17);
        this.bouclier.setScale(1)
        //this.bouclier.body.allowGravity = false;

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


        /////////////////////////////////VIE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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




        /////////////////////////////////SURCHAUFFE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


        this.anims.create({
            key: 'surchauffe_1',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_2',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_3',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 2, end: 2 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_4',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 3, end: 3 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_5',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 4, end: 4 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_6',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 5, end: 5 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_7',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 6, end: 6 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_8',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 7, end: 7 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'surchauffe_9',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 8, end: 8 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_10',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 9, end: 9 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_11',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 10, end: 10 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_12',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 11, end: 11 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_13',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 12, end: 12 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_14',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 13, end: 13 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_15',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 14, end: 14 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_16',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 15, end: 15 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_17',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 16, end: 16 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_18',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 17, end: 17 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_19',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 18, end: 18 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_20',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 19, end: 19 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_21',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 20, end: 20 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_22',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 21, end: 21 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_23',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 22, end: 22 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_24',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 23, end: 23 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_25',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 24, end: 24 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_26',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 25, end: 25 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_27',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 26, end: 26 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_28',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 27, end: 27 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_29',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 28, end: 28 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_30',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 29, end: 29 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_31',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 30, end: 30 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_32',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 31, end: 31 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_33',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 32, end: 32 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_34',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 33, end: 33 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_35',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 34, end: 34 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_36',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 35, end: 35 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_37',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 36, end: 36 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_38',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 37, end: 37 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_39',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 38, end: 38 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_40',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 39, end: 39 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_41',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 40, end: 40 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_42',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 41, end: 41 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_43',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 42, end: 42 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_44',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 43, end: 43 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_45',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 44, end: 44 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_46',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 45, end: 45 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_47',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 46, end: 46 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_48',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 47, end: 47 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_49',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 48, end: 48 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_50',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 49, end: 49 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_51',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 50, end: 51 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_52',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 52, end: 53 }),
            frameRate: 4,
            repeat: -1
        })





    }

    update() {
        let angle = Phaser.Math.Angle.Between(this.arme.x, this.arme.y, this.input.activePointer.worldX, this.input.activePointer.worldY);
        this.arme.setRotation(angle);

        if (this.clavier.F.isDown && rechbouclier == true) {
            invinssible = true

            setTimeout(() => {
                usebouclier = false
                invinssible = false
            }, 10000);

            setTimeout(() => {
                rechbouclier = true
            }, 30000);
        }


        if (isLeftButtonDown && this.canshootA1) {
            //this.point.normalize()
            this.tir_player.create(this.player.x, this.player.y, "tire_p_A_1")
                .setVelocityX(Math.cos(angle) * 7500)
                .setVelocityY(Math.sin(angle) * 7500)
            if (surchauffe < 100) {
                this.canshootA1 = false
                
                
                setTimeout(() => {
                    this.canshootA1 = true
                    surchauffe += 1
                }, 50);
            }

            else {
                this.canshootA1 = false
                recharge = 1
                this.sonBF.play();
                this.sonB.pause();

                setTimeout(() => {
                    this.canshootA1 = true
                    surchauffe = 0
                    recharge = 0
                }, 6500);
            }

        }


        if (surchauffe > 0 && this.clavier.R.isDown && recharge == 0) {
            this.canshootA1 = false
            surchauffe = -200
            setTimeout(() => {
                this.canshootA1 = true
                surchauffe = 0
            }, 3000);
        }

        //while (surchauffe <= 10) {
        //    if (isLeftButtonDown && this.canshootA1) {
        //        this.point.normalize()
        //        this.tir_player.create(this.player.x, this.player.y, "tire_p_A_1")
        //            .setVelocityX((this.input.activePointer.worldX - this.player.x) * 10)
        //            .setVelocityY((this.input.activePointer.worldY - this.player.y) * 10)
        //    }
        //    if (surchauffe >= 10) {
        //        this.canshootA1 = false
        //        setTimeout(() => {
        //            this.canshootA1 = true
        //            surchauffe += 1
        //            console.log('surchauffe', surchauffe)
        //        }, 300);
        //    }
        //    else {
        //        console.log('deb')
        //        this.canshootA1 = false
        //        setTimeout(() => {
        //            this.canshootA1 = true
        //            console.log('fin')
        //            surchauffe == 0

        //        }, 5000);
        //    }
        //}



        //this.graphics.lineBetween(this.player.x, this.player.y,  this.point.x,  this.point.y);
        //////////////////////////////////////////////////OUVERTURE PORTE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        if (this.generateur_1.vieGenerateur <= 0) {
            setTimeout(() => {
                this.porte_1.destroy()
            }, 5000);
        }

        if (this.generateur_2.vieGenerateur <= 0 && this.generateur_3.vieGenerateur <= 0 && this.generateur_4.vieGenerateur <= 0 && this.generateur_5.vieGenerateur <= 0 && this.generateur_6.vieGenerateur <= 0 && this.generateur_7.vieGenerateur <= 0 && this.generateur_8.vieGenerateur <= 0 && this.generateur_9.vieGenerateur <= 0 && this.generateur_10.vieGenerateur <= 0 && this.generateur_11.vieGenerateur <= 0) {
            setTimeout(() => {
                this.porte_2.destroy()
            }, 5000);
        }

        //////////////////////////////////////////////////TRACKING TURRET\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        if (this.tourelle.getChildren()[0]) {
            const distance1 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[0].x, this.tourelle.getChildren()[0].y, this.player.x, this.player.y);
            if (distance1 < 3000) {
                if (this.tourelle.getChildren()[0].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[0].x, this.tourelle.getChildren()[0].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[0].x).setVelocityY(this.player.y - this.tourelle.getChildren()[0].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[0].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[0].canshoot = true
                    }, 2500);
                }
            }
        }

        if (this.tourelle.getChildren()[1]) {
            const distance2 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[1].x, this.tourelle.getChildren()[1].y, this.player.x, this.player.y);
            if (distance2 < 3000) {
                if (this.canshoot2 == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[1].x, this.tourelle.getChildren()[1].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[1].x).setVelocityY(this.player.y - this.tourelle.getChildren()[1].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[1].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.canshoot2 = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[2]) {
            const distance3 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[2].x, this.tourelle.getChildren()[2].y, this.player.x, this.player.y);
            if (distance3 < 3000) {
                if (this.tourelle.getChildren()[2].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[2].x, this.tourelle.getChildren()[2].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[2].x).setVelocityY(this.player.y - this.tourelle.getChildren()[2].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[2].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[2].canshoot = true
                    }, 2000);
                }
            }
        }

        if (this.tourelle.getChildren()[3]) {
            const distance4 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[3].x, this.tourelle.getChildren()[3].y, this.player.x, this.player.y);
            if (distance4 < 3000) {
                if (this.tourelle.getChildren()[3].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[3].x, this.tourelle.getChildren()[3].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[3].x).setVelocityY(this.player.y - this.tourelle.getChildren()[3].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[3].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[3].canshoot = true
                    }, 2200);
                }
            }
        }

        if (this.tourelle.getChildren()[4]) {
            const distance5 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[4].x, this.tourelle.getChildren()[4].y, this.player.x, this.player.y);
            if (distance5 < 3000) {
                if (this.tourelle.getChildren()[4].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[4].x, this.tourelle.getChildren()[4].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[4].x).setVelocityY(this.player.y - this.tourelle.getChildren()[4].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[4].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[4].canshoot = true
                    }, 1900);
                }
            }
        }

        if (this.tourelle.getChildren()[5]) {
            const distance6 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[5].x, this.tourelle.getChildren()[5].y, this.player.x, this.player.y);
            if (distance6 < 3000) {
                if (this.tourelle.getChildren()[5].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[5].x, this.tourelle.getChildren()[5].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[5].x).setVelocityY(this.player.y - this.tourelle.getChildren()[5].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[5].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[5].canshoot = true
                    }, 2400);
                }
            }
        }

        if (this.tourelle.getChildren()[6]) {
            const distance7 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[6].x, this.tourelle.getChildren()[6].y, this.player.x, this.player.y);
            if (distance7 < 3000) {
                if (this.tourelle.getChildren()[6].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[6].x, this.tourelle.getChildren()[6].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[6].x).setVelocityY(this.player.y - this.tourelle.getChildren()[6].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[6].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[6].canshoot = true
                    }, 3200);
                }
            }
        }

        if (this.tourelle.getChildren()[7]) {
            const distance8 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[7].x, this.tourelle.getChildren()[7].y, this.player.x, this.player.y);
            if (distance8 < 1500) {
                if (this.tourelle.getChildren()[7].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[7].x, this.tourelle.getChildren()[7].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[7].x).setVelocityY(this.player.y - this.tourelle.getChildren()[7].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[7].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[7].canshoot = true
                    }, 3000);
                }
            }
        }

        if (this.tourelle.getChildren()[8]) {
            const distance9 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[8].x, this.tourelle.getChildren()[8].y, this.player.x, this.player.y);
            if (distance9 < 1500) {
                if (this.tourelle.getChildren()[8].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[8].x, this.tourelle.getChildren()[8].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[8].x).setVelocityY(this.player.y - this.tourelle.getChildren()[8].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[8].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[8].canshoot = true
                    }, 3000);
                }
            }
        }

        if (this.tourelle.getChildren()[9]) {
            const distance10 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[9].x, this.tourelle.getChildren()[9].y, this.player.x, this.player.y);
            if (distance10 < 1500) {
                if (this.tourelle.getChildren()[9].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[9].x, this.tourelle.getChildren()[9].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[9].x).setVelocityY(this.player.y - this.tourelle.getChildren()[9].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[9].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[9].canshoot = true
                    }, 2500);
                }
            }
        }

        if (this.tourelle.getChildren()[10]) {
            const distance11 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[10].x, this.tourelle.getChildren()[10].y, this.player.x, this.player.y);
            if (distance11 < 1500) {
                if (this.tourelle.getChildren()[10].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[10].x, this.tourelle.getChildren()[10].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[10].x).setVelocityY(this.player.y - this.tourelle.getChildren()[10].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[10].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[10].canshoot = true
                    }, 2200);
                }
            }
        }

        if (this.tourelle.getChildren()[11]) {
            const distance12 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[11].x, this.tourelle.getChildren()[11].y, this.player.x, this.player.y);
            if (distance12 < 900) {
                if (this.tourelle.getChildren()[11].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[11].x, this.tourelle.getChildren()[11].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[11].x).setVelocityY(this.player.y - this.tourelle.getChildren()[11].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[11].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[11].canshoot = true
                    }, 2500);
                }
            }
        }

        if (this.tourelle.getChildren()[12]) {
            const distance13 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[12].x, this.tourelle.getChildren()[12].y, this.player.x, this.player.y);
            if (distance13 < 900) {
                if (this.tourelle.getChildren()[12].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[12].x, this.tourelle.getChildren()[12].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[12].x).setVelocityY(this.player.y - this.tourelle.getChildren()[12].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[12].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[12].canshoot = true
                    }, 2500);
                }
            }
        }

        if (this.tourelle.getChildren()[13]) {
            const distance14 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[13].x, this.tourelle.getChildren()[13].y, this.player.x, this.player.y);
            if (distance14 < 900) {
                if (this.tourelle.getChildren()[13].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[13].x, this.tourelle.getChildren()[13].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[13].x).setVelocityY(this.player.y - this.tourelle.getChildren()[13].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[13].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[13].canshoot = true
                    }, 2500);
                }
            }
        }

        if (this.tourelle.getChildren()[14]) {
            const distance15 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[14].x, this.tourelle.getChildren()[14].y, this.player.x, this.player.y);
            if (distance15 < 900) {
                if (this.tourelle.getChildren()[14].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[14].x, this.tourelle.getChildren()[14].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[14].x).setVelocityY(this.player.y - this.tourelle.getChildren()[14].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[14].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[14].canshoot = true
                    }, 2500);
                }
            }
        }

        if (this.tourelle.getChildren()[15]) {
            const distance16 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[15].x, this.tourelle.getChildren()[15].y, this.player.x, this.player.y);
            if (distance16 < 3000) {
                if (this.tourelle.getChildren()[15].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[15].x, this.tourelle.getChildren()[15].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[15].x).setVelocityY(this.player.y - this.tourelle.getChildren()[15].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[15].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[15].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[16]) {
            const distance17 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[16].x, this.tourelle.getChildren()[16].y, this.player.x, this.player.y);
            if (distance17 < 3000) {
                if (this.tourelle.getChildren()[16].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[16].x, this.tourelle.getChildren()[16].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[16].x).setVelocityY(this.player.y - this.tourelle.getChildren()[16].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[16].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[16].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[17]) {
            const distance18 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[17].x, this.tourelle.getChildren()[17].y, this.player.x, this.player.y);
            if (distance18 < 3000) {
                if (this.tourelle.getChildren()[17].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[17].x, this.tourelle.getChildren()[17].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[17].x).setVelocityY(this.player.y - this.tourelle.getChildren()[17].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[17].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[17].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[18]) {
            const distance19 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[18].x, this.tourelle.getChildren()[18].y, this.player.x, this.player.y);
            if (distance19 < 3000) {
                if (this.tourelle.getChildren()[18].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[18].x, this.tourelle.getChildren()[18].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[18].x).setVelocityY(this.player.y - this.tourelle.getChildren()[18].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[18].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.canshoot20 = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[19]) {
            const distance20 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[19].x, this.tourelle.getChildren()[19].y, this.player.x, this.player.y);
            if (distance20 < 3000) {
                if (this.tourelle.getChildren()[19].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[19].x, this.tourelle.getChildren()[19].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[19].x).setVelocityY(this.player.y - this.tourelle.getChildren()[19].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[19].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[19].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[20]) {
            const distance21 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[20].x, this.tourelle.getChildren()[20].y, this.player.x, this.player.y);
            if (distance21 < 3000) {
                if (this.tourelle.getChildren()[20].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[20].x, this.tourelle.getChildren()[20].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[20].x).setVelocityY(this.player.y - this.tourelle.getChildren()[20].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[20].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[20].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[21]) {
            const distance22 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[21].x, this.tourelle.getChildren()[21].y, this.player.x, this.player.y);
            if (distance22 < 3000) {
                if (this.tourelle.getChildren()[21].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[21].x, this.tourelle.getChildren()[21].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[21].x).setVelocityY(this.player.y - this.tourelle.getChildren()[21].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[21].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[21].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[22]) {
            const distance23 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[22].x, this.tourelle.getChildren()[22].y, this.player.x, this.player.y);
            if (distance23 < 3000) {
                if (this.tourelle.getChildren()[22].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[22].x, this.tourelle.getChildren()[22].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[22].x).setVelocityY(this.player.y - this.tourelle.getChildren()[22].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[22].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[22].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[23]) {
            const distance24 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[23].x, this.tourelle.getChildren()[23].y, this.player.x, this.player.y);
            this.tourelle.getChildren()[23].x = this.plateforme_1.x + 128
            this.tourelle.getChildren()[23].y = this.plateforme_1.y + 64
            if (distance24 < 3000) {
                if (this.tourelle.getChildren()[23].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[23].x, this.tourelle.getChildren()[23].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[23].x).setVelocityY(this.player.y - this.tourelle.getChildren()[23].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[23].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[23].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[24]) {
            const distance25 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[24].x, this.tourelle.getChildren()[24].y, this.player.x, this.player.y);
            this.tourelle.getChildren()[24].x = this.plateforme_1.x - 128
            this.tourelle.getChildren()[24].y = this.plateforme_1.y + 64
            if (distance25 < 3000) {
                if (this.tourelle.getChildren()[24].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[24].x, this.tourelle.getChildren()[24].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[24].x).setVelocityY(this.player.y - this.tourelle.getChildren()[24].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[24].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[24].canshoot = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[25]) {
            const distance26 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[25].x, this.tourelle.getChildren()[25].y, this.player.x, this.player.y);
            this.tourelle.getChildren()[25].x = this.plateforme_2.x - 128
            this.tourelle.getChildren()[25].y = this.plateforme_2.y + 64
            if (distance26 < 3000) {
                if (this.tourelle.getChildren()[25].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[25].x, this.tourelle.getChildren()[25].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[25].x).setVelocityY(this.player.y - this.tourelle.getChildren()[25].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[25].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[25].canshoot = true
                    }, 2000);
                }
            }
        }

        if (this.tourelle.getChildren()[26]) {
            const distance27 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[26].x, this.tourelle.getChildren()[26].y, this.player.x, this.player.y);
            this.tourelle.getChildren()[26].x = this.plateforme_2.x + 128
            this.tourelle.getChildren()[26].y = this.plateforme_2.y + 64
            if (distance27 < 3000) {
                if (this.tourelle.getChildren()[26].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[26].x, this.tourelle.getChildren()[26].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[26].x).setVelocityY(this.player.y - this.tourelle.getChildren()[26].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[26].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[26].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[27]) {
            const distance28 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[27].x, this.tourelle.getChildren()[27].y, this.player.x, this.player.y);
            if (distance28 < 3000) {
                if (this.tourelle.getChildren()[27].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[27].x, this.tourelle.getChildren()[27].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[27].x).setVelocityY(this.player.y - this.tourelle.getChildren()[27].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[27].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[27].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[28]) {
            const distance29 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[28].x, this.tourelle.getChildren()[28].y, this.player.x, this.player.y);
            if (distance29 < 3000) {
                if (this.tourelle.getChildren()[28].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[28].x, this.tourelle.getChildren()[28].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[28].x).setVelocityY(this.player.y - this.tourelle.getChildren()[28].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[28].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[28].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[29]) {
            const distance30 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[29].x, this.tourelle.getChildren()[29].y, this.player.x, this.player.y);
            if (distance30 < 3000) {
                if (this.tourelle.getChildren()[29].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[29].x, this.tourelle.getChildren()[29].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[29].x).setVelocityY(this.player.y - this.tourelle.getChildren()[29].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[29].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[29].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[30]) {
            const distance31 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[30].x, this.tourelle.getChildren()[30].y, this.player.x, this.player.y);
            if (distance31 < 3000) {
                if (this.tourelle.getChildren()[30].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[30].x, this.tourelle.getChildren()[30].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[30].x).setVelocityY(this.player.y - this.tourelle.getChildren()[30].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[30].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[30].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[31]) {
            const distance32 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[31].x, this.tourelle.getChildren()[31].y, this.player.x, this.player.y);
            if (distance32 < 3000) {
                if (this.tourelle.getChildren()[31].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[31].x, this.tourelle.getChildren()[31].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[31].x).setVelocityY(this.player.y - this.tourelle.getChildren()[31].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[31].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[31].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[32]) {
            const distance33 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[32].x, this.tourelle.getChildren()[32].y, this.player.x, this.player.y);
            if (distance33 < 3000) {
                if (this.tourelle.getChildren()[32].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[32].x, this.tourelle.getChildren()[32].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[32].x).setVelocityY(this.player.y - this.tourelle.getChildren()[32].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[32].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[32].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[33]) {
            const distance34 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[33].x, this.tourelle.getChildren()[33].y, this.player.x, this.player.y);
            if (distance34 < 3000) {
                if (this.tourelle.getChildren()[33].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[33].x, this.tourelle.getChildren()[33].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[33].x).setVelocityY(this.player.y - this.tourelle.getChildren()[33].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[33].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[33].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[34]) {
            const distance35 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[34].x, this.tourelle.getChildren()[34].y, this.player.x, this.player.y);
            if (distance35 < 3000) {
                if (this.tourelle.getChildren()[34].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[34].x, this.tourelle.getChildren()[34].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[34].x).setVelocityY(this.player.y - this.tourelle.getChildren()[34].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[34].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[34].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[35]) {
            const distance36 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[35].x, this.tourelle.getChildren()[35].y, this.player.x, this.player.y);
            if (distance36 < 3000) {
                if (this.tourelle.getChildren()[35].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[35].x, this.tourelle.getChildren()[35].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[35].x).setVelocityY(this.player.y - this.tourelle.getChildren()[35].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[35].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[35].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[36]) {
            const distance37 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[36].x, this.tourelle.getChildren()[36].y, this.player.x, this.player.y);
            if (distance37 < 3000) {
                if (this.tourelle.getChildren()[36].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[36].x, this.tourelle.getChildren()[36].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[36].x).setVelocityY(this.player.y - this.tourelle.getChildren()[36].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[36].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[36].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[37]) {
            const distance38 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[37].x, this.tourelle.getChildren()[37].y, this.player.x, this.player.y);
            if (distance38 < 3000) {
                if (this.tourelle.getChildren()[37].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[37].x, this.tourelle.getChildren()[37].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[37].x).setVelocityY(this.player.y - this.tourelle.getChildren()[37].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[37].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[37].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.tourelle.getChildren()[38]) {
            const distance39 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[38].x, this.tourelle.getChildren()[38].y, this.player.x, this.player.y);
            if (distance39 < 3000) {
                if (this.tourelle.getChildren()[38].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[38].x, this.tourelle.getChildren()[38].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[38].x).setVelocityY(this.player.y - this.tourelle.getChildren()[38].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[38].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.tourelle.getChildren()[38].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[0]) {
            const distance40 = Phaser.Math.Distance.Between(this.robot.getChildren()[0].x, this.robot.getChildren()[0].y, this.player.x, this.player.y);
            if (distance40 < 3000) {
                if (this.robot.getChildren()[0].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[0].x, this.robot.getChildren()[0].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[0].x).setVelocityY(this.player.y - this.robot.getChildren()[0].y).body.setAllowGravity(false)
                    this.robot.getChildren()[0].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[0].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[1]) {
            const distance41 = Phaser.Math.Distance.Between(this.robot.getChildren()[1].x, this.robot.getChildren()[1].y, this.player.x, this.player.y);
            if (distance41 < 3000) {
                if (this.robot.getChildren()[1].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[1].x, this.robot.getChildren()[1].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[1].x).setVelocityY(this.player.y - this.robot.getChildren()[1].y).body.setAllowGravity(false)
                    this.robot.getChildren()[1].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[1].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[2]) {
            const distance42 = Phaser.Math.Distance.Between(this.robot.getChildren()[2].x, this.robot.getChildren()[2].y, this.player.x, this.player.y);
            if (distance42 < 3000) {
                if (this.robot.getChildren()[2].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[2].x, this.robot.getChildren()[2].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[2].x).setVelocityY(this.player.y - this.robot.getChildren()[2].y).body.setAllowGravity(false)
                    this.robot.getChildren()[2].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[2].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[3]) {
            const distance43 = Phaser.Math.Distance.Between(this.robot.getChildren()[3].x, this.robot.getChildren()[3].y, this.player.x, this.player.y);
            if (distance43 < 3000) {
                if (this.robot.getChildren()[3].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[3].x, this.robot.getChildren()[3].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[3].x).setVelocityY(this.player.y - this.robot.getChildren()[3].y).body.setAllowGravity(false)
                    this.robot.getChildren()[3].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[3].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[4]) {
            const distance44 = Phaser.Math.Distance.Between(this.robot.getChildren()[4].x, this.robot.getChildren()[4].y, this.player.x, this.player.y);
            if (distance44 < 3000) {
                if (this.robot.getChildren()[4].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[4].x, this.robot.getChildren()[4].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[4].x).setVelocityY(this.player.y - this.robot.getChildren()[4].y).body.setAllowGravity(false)
                    this.robot.getChildren()[4].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[4].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[5]) {
            const distance45 = Phaser.Math.Distance.Between(this.robot.getChildren()[5].x, this.robot.getChildren()[5].y, this.player.x, this.player.y);
            if (distance45 < 3000) {
                if (this.robot.getChildren()[5].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[5].x, this.robot.getChildren()[5].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[5].x).setVelocityY(this.player.y - this.robot.getChildren()[5].y).body.setAllowGravity(false)
                    this.robot.getChildren()[5].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[5].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[6]) {
            const distance46 = Phaser.Math.Distance.Between(this.robot.getChildren()[6].x, this.robot.getChildren()[6].y, this.player.x, this.player.y);
            if (distance46 < 3000) {
                if (this.robot.getChildren()[6].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[6].x, this.robot.getChildren()[6].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[6].x).setVelocityY(this.player.y - this.robot.getChildren()[6].y).body.setAllowGravity(false)
                    this.robot.getChildren()[6].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[6].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[7]) {
            const distance47 = Phaser.Math.Distance.Between(this.robot.getChildren()[7].x, this.robot.getChildren()[7].y, this.player.x, this.player.y);
            if (distance47 < 3000) {
                if (this.robot.getChildren()[7].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[7].x, this.robot.getChildren()[7].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[7].x).setVelocityY(this.player.y - this.robot.getChildren()[7].y).body.setAllowGravity(false)
                    this.robot.getChildren()[7].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[7].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[8]) {
            const distance48 = Phaser.Math.Distance.Between(this.robot.getChildren()[8].x, this.robot.getChildren()[8].y, this.player.x, this.player.y);
            if (distance48 < 3000) {
                if (this.robot.getChildren()[8].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[8].x, this.robot.getChildren()[8].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[8].x).setVelocityY(this.player.y - this.robot.getChildren()[8].y).body.setAllowGravity(false)
                    this.robot.getChildren()[8].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[8].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[9]) {
            const distance49 = Phaser.Math.Distance.Between(this.robot.getChildren()[9].x, this.robot.getChildren()[9].y, this.player.x, this.player.y);
            if (distance49 < 3000) {
                if (this.robot.getChildren()[9].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[9].x, this.robot.getChildren()[9].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[9].x).setVelocityY(this.player.y - this.robot.getChildren()[9].y).body.setAllowGravity(false)
                    this.robot.getChildren()[9].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[9].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[10]) {
            const distance50 = Phaser.Math.Distance.Between(this.robot.getChildren()[10].x, this.robot.getChildren()[10].y, this.player.x, this.player.y);
            if (distance50 < 3000) {
                if (this.robot.getChildren()[10].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[10].x, this.robot.getChildren()[10].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[10].x).setVelocityY(this.player.y - this.robot.getChildren()[10].y).body.setAllowGravity(false)
                    this.robot.getChildren()[10].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[10].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[11]) {
            const distance51 = Phaser.Math.Distance.Between(this.robot.getChildren()[11].x, this.robot.getChildren()[11].y, this.player.x, this.player.y);
            if (distance51 < 3000) {
                if (this.robot.getChildren()[11].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[11].x, this.robot.getChildren()[11].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[11].x).setVelocityY(this.player.y - this.robot.getChildren()[11].y).body.setAllowGravity(false)
                    this.robot.getChildren()[11].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[11].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[12]) {
            const distance52 = Phaser.Math.Distance.Between(this.robot.getChildren()[12].x, this.robot.getChildren()[12].y, this.player.x, this.player.y);
            if (distance52 < 3000) {
                if (this.robot.getChildren()[12].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[12].x, this.robot.getChildren()[12].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[12].x).setVelocityY(this.player.y - this.robot.getChildren()[12].y).body.setAllowGravity(false)
                    this.robot.getChildren()[12].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[12].canshoot = true
                    }, 1800);
                }
            }
        }

        if (this.robot.getChildren()[13]) {
            const distance53 = Phaser.Math.Distance.Between(this.robot.getChildren()[13].x, this.robot.getChildren()[13].y, this.player.x, this.player.y);
            if (distance53 < 3000) {
                if (this.robot.getChildren()[13].canshoot == true) {
                    this.projectile_tourelle.create(this.robot.getChildren()[13].x, this.robot.getChildren()[13].y, "lazzzzzer").setVelocityX(this.player.x - this.robot.getChildren()[13].x).setVelocityY(this.player.y - this.robot.getChildren()[13].y).body.setAllowGravity(false)
                    this.robot.getChildren()[13].canshoot = false
                    this.sonTT.play();
                    setTimeout(() => {
                        this.robot.getChildren()[13].canshoot = true
                    }, 1800);
                }
            }
        }

        //const distance26 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[25].x, this.tourelle.getChildren()[25].y, this.player.x, this.player.y);


        //const distance18 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[17].x, this.tourelle.getChildren()[17].y, this.player.x, this.player.y);





















        //if (distance26 < 3000) {
        //    if (this.canshoot27 == true) {
        //        this.projectile_tourelle.create(this.tourelle.getChildren()[25].x, this.tourelle.getChildren()[25].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[25].x).setVelocityY(this.player.y - this.tourelle.getChildren()[25].y).body.setAllowGravity(false)
        //        this.canshoot27 = false
        //        setTimeout(() => {
        //            this.canshoot27 = true
        //        }, 1000);
        //    }
        //}
        this.arme.x = this.player.x
        this.arme.y = this.player.y


        //if (this.clavier.E.isDown){

        //}





        if (this.player)

            if (this.clavier.Q.isDown) {
                this.player.setVelocityX(-600);
                if(this.player.body.velocity.y == 0){
                    this.sonMarche.resume();
                
                }
                //this.HB.x=this.player.x-32;
                //this.HB.y=this.player.y;
            }
            else if (this.clavier.D.isDown) {
                this.player.setVelocityX(600);
                if(this.player.body.velocity.y == 0){
                    this.sonMarche.resume();
                }
                //this.HB.x=this.player.x+32;
                //this.HB.y=this.player.y;
            }
            else {
                this.player.setVelocityX(0)
                this.sonMarche.pause();
                //this.player.anims.play('idle', true);
            }
        if (this.clavier.SPACE.isDown) {
            if (this.player.body.blocked.down) {
                this.player.setVelocityY(-1200);
                this.sonMarche.pause();

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


        if (surchauffe == 0) {
            this.surchauffeV.anims.play("surchauffe_1", true);
        }
        if (surchauffe == 2) {
            this.surchauffeV.anims.play("surchauffe_2", true);
        }
        if (surchauffe == 4) {
            this.surchauffeV.anims.play("surchauffe_3", true);
        }
        if (surchauffe == 6) {
            this.surchauffeV.anims.play("surchauffe_4", true);
        }
        if (surchauffe == 8) {
            this.surchauffeV.anims.play("surchauffe_5", true);
        }
        if (surchauffe == 10) {
            this.surchauffeV.anims.play("surchauffe_6", true);
        }
        if (surchauffe == 12) {
            this.surchauffeV.anims.play("surchauffe_7", true);
        }
        if (surchauffe == 14) {
            this.surchauffeV.anims.play("surchauffe_8", true);
        }
        if (surchauffe == 16) {
            this.surchauffeV.anims.play("surchauffe_9", true);
        }
        if (surchauffe == 18) {
            this.surchauffeV.anims.play("surchauffe_10", true);
        }
        if (surchauffe == 20) {
            this.surchauffeV.anims.play("surchauffe_11", true);
        }
        if (surchauffe == 22) {
            this.surchauffeV.anims.play("surchauffe_12", true);
        }
        if (surchauffe == 24) {
            this.surchauffeV.anims.play("surchauffe_13", true);
        }
        if (surchauffe == 26) {
            this.surchauffeV.anims.play("surchauffe_14", true);
        }
        if (surchauffe == 28) {
            this.surchauffeV.anims.play("surchauffe_15", true);
        }
        if (surchauffe == 30) {
            this.surchauffeV.anims.play("surchauffe_16", true);
        }
        if (surchauffe == 32) {
            this.surchauffeV.anims.play("surchauffe_17", true);
        }
        if (surchauffe == 34) {
            this.surchauffeV.anims.play("surchauffe_18", true);
        }
        if (surchauffe == 36) {
            this.surchauffeV.anims.play("surchauffe_19", true);
        }
        if (surchauffe == 38) {
            this.surchauffeV.anims.play("surchauffe_20", true);
        }
        if (surchauffe == 40) {
            this.surchauffeV.anims.play("surchauffe_21", true);
        }
        if (surchauffe == 42) {
            this.surchauffeV.anims.play("surchauffe_22", true);
        }
        if (surchauffe == 44) {
            this.surchauffeV.anims.play("surchauffe_23", true);
        }
        if (surchauffe == 46) {
            this.surchauffeV.anims.play("surchauffe_24", true);
        }
        if (surchauffe == 48) {
            this.surchauffeV.anims.play("surchauffe_25", true);
        }
        if (surchauffe == 50) {
            this.surchauffeV.anims.play("surchauffe_26", true);
        }
        if (surchauffe == 52) {
            this.surchauffeV.anims.play("surchauffe_27", true);
        }
        if (surchauffe == 54) {
            this.surchauffeV.anims.play("surchauffe_28", true);
        }
        if (surchauffe == 56) {
            this.surchauffeV.anims.play("surchauffe_29", true);
        }
        if (surchauffe == 58) {
            this.surchauffeV.anims.play("surchauffe_30", true);
        }
        if (surchauffe == 60) {
            this.surchauffeV.anims.play("surchauffe_31", true);
        }
        if (surchauffe == 62) {
            this.surchauffeV.anims.play("surchauffe_32", true);
        }
        if (surchauffe == 64) {
            this.surchauffeV.anims.play("surchauffe_33", true);
        }
        if (surchauffe == 66) {
            this.surchauffeV.anims.play("surchauffe_34", true);
        }
        if (surchauffe == 68) {
            this.surchauffeV.anims.play("surchauffe_35", true);
        }
        if (surchauffe == 70) {
            this.surchauffeV.anims.play("surchauffe_36", true);
        }
        if (surchauffe == 72) {
            this.surchauffeV.anims.play("surchauffe_37", true);
        }
        if (surchauffe == 74) {
            this.surchauffeV.anims.play("surchauffe_38", true);
        }
        if (surchauffe == 76) {
            this.surchauffeV.anims.play("surchauffe_39", true);
        }
        if (surchauffe == 78) {
            this.surchauffeV.anims.play("surchauffe_40", true);
        }
        if (surchauffe == 80) {
            this.surchauffeV.anims.play("surchauffe_41", true);
        }
        if (surchauffe == 82) {
            this.surchauffeV.anims.play("surchauffe_42", true);
        }
        if (surchauffe == 84) {
            this.surchauffeV.anims.play("surchauffe_43", true);
        }
        if (surchauffe == 86) {
            this.surchauffeV.anims.play("surchauffe_44", true);
        }
        if (surchauffe == 88) {
            this.surchauffeV.anims.play("surchauffe_45", true);
        }
        if (surchauffe == 90) {
            this.surchauffeV.anims.play("surchauffe_46", true);
        }
        if (surchauffe == 92) {
            this.surchauffeV.anims.play("surchauffe_47", true);
        }
        if (surchauffe == 94) {
            this.surchauffeV.anims.play("surchauffe_48", true);
        }
        if (surchauffe == 96) {
            this.surchauffeV.anims.play("surchauffe_49", true);
        }
        if (surchauffe == 98) {
            this.surchauffeV.anims.play("surchauffe_50", true);
        }
        if (surchauffe == 100) {
            this.surchauffeV.anims.play("surchauffe_51", true);
        }
        if (surchauffe < 0) {
            this.surchauffeV.anims.play("surchauffe_52", true);
        }


        const distance_souris = Phaser.Math.Distance.Between(this.input.activePointer.worldX, this.input.activePointer.worldY, this.player.x, this.player.y);
        distanceX = this.input.activePointer.worldX - this.player.x
        distanceY = this.input.activePointer.worldY - this.player.y
        if (isRightButtonDown) {
            if (distance_souris < 650) {
                this.cameras.main.centerOn(this.player.x + distanceX, this.player.y + distanceY)
            }
        } else {
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

    tourelle_allez_a_droite(tourelle) {
        tourelle.setVelocityX(500);
        setTimeout(() => {
            this.tourelle_allez_a_gauche(tourelle)
        }, 12000);
    }



    tourelle_allez_a_gauche(tourelle) {
        tourelle.setVelocityX(-500);
        setTimeout(() => {
            this.tourelle_allez_a_droite(tourelle)
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

    tirSUPP(laser, collide) {
        collide.destroy()
    }

    toucheplayer(laser, player) {
        if (invinssible == false) {
            HP -= 1
        }
        player.destroy()

    }

    tourelleDegats(tir_player, tourelle) {
        tir_player.destroy()
        tourelle.vieTourelle -= 1
        if (tourelle.vieTourelle <= 0) {
            tourelle.destroy()
            tourelle.canshoot = false

        }
    }


    robotDegats(tir_player, robot) {
        tir_player.destroy()
        robot.vierobot -= 1
        if (robot.vierobot <= 0) {
            robot.destroy()
            robot.canshoot = false

        }
    }

    DG(generateur, tir_player) {
        tir_player.destroy()

        generateur.vieGenerateur -= 1
        if (generateur.vieGenerateur <= 0) {
            generateur.setVisible(false)

        }

    }
    //TSM(tourelle){
    //    
    //}


    //normalize()
    MR(robot, grp) {
        robot.setVelocityX(-robot.body.velocity.x)
    }


    phase2() {
        this.scene.start("partie_2")
    }

}

//////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

class partie_2 extends Phaser.Scene {
    constructor() {
        super('partie_2');
        this.canshootA1 = true
        this.isLeftButtonDown = false;

    }

    preload() {
        this.load.tilemapTiledJSON("partie_2", "maps/partie_2.json");
        this.load.image("phaser_assets", "maps/test.png");
        this.load.image('perso', 'sprites/test_perso.png');
        this.load.image('ascensseur', 'maps/ascensseur.png');
        this.load.image('heal', 'sprites/heal.png');
        this.load.image('hb_ascensseur', 'maps/hb_ascensseur.png');
        this.load.image('plateforme', 'maps/plateforme.png');
        this.load.image('arme1', 'sprites/arme_1.png');
        this.load.image('tourelle', 'sprites/tourelle.png');
        this.load.image('porteS1', 'sprites/porte_simple_1.png');
        this.load.image('porteS2', 'sprites/porte_simple_2.png');
        //this.load.image('TP1', 'maps/TP.png');
        this.load.image('MI', 'maps/murINV.png');
        this.load.image('generateur', 'sprites/generateur.png');
        this.load.image('HBZM', 'sprites/hb_z_m.png');
        this.load.image('porteL', 'sprites/porte_lourd.png');
        this.load.image('lazzzzzer', 'sprites/lazzzzzer.png');
        this.load.image('tire_p_A_1', 'sprites/tire_p_A_1.png');
        this.load.spritesheet('Loading', 'sprites/ecran_chargement.png',
            { frameWidth: 896, frameHeight: 448 });
        this.load.spritesheet('HP', 'sprites/barre_vie.png',
            { frameWidth: 1300, frameHeight: 200 });
        this.load.spritesheet('surchauffe', 'sprites/surchauffe.png',
            { frameWidth: 30, frameHeight: 60 });

        //this.load.spritesheet('perso','sprites/test_perso.png',
        //        { frameWidth: 192, frameHeight: 192 });

        this.load.setPath('sound');
        this.load.audio('B1', 'DBateuse_3.mp3');
        this.load.audio('B2', 'MBateuse_3.mp3');
        this.load.audio('B3', 'FBateuse_3.mp3');
        this.load.audio('CU', 'coup_unique.mp3');
        this.load.audio('M', 'marche.mp3');
        this.load.audio('PP', 'propulsion.mp3');
    }

    create() {

        this.sonTT = this.sound.add('CU');
        this.sonB = this.sound.add('B2');
        this.sonBF = this.sound.add('B3');
        this.sonMarche = this.sound.add('M');
        this.sonPropulsion = this.sound.add('PP');


        //input=this.input;
        const carteDuNiveau1 = this.add.tilemap("partie_2");
        const tileset1 = carteDuNiveau1.addTilesetImage("test", "phaser_assets");
        const base1 = carteDuNiveau1.createLayer('base1', tileset1);
        base1.setCollisionByProperty({ estSolide: true });
        this.player = this.physics.add.sprite(14 * 64, 6 * 64, 'perso');
        this.physics.add.collider(this.player, base1);
        this.cameras.main.zoom = 0.2;
        //this.cameras.main.startFollow(this.player);
        this.clavier = this.input.keyboard.addKeys('Q,D,S,E,R,F,SPACE,SHIFT');
        this.vie = this.add.sprite(-800, -600, 'HP').setScale(1.8).setScrollFactor(0);
        this.tir_player = this.physics.add.group({ gravity: false })
        this.cameras.main.centerOn(this.player.x, this.player.y)
        this.surchauffeV = this.add.sprite(-1650, 1000, 'surchauffe').setScale(12.8).setScrollFactor(0);
        this.surchauffeV.depth = 1000
        this.vie.depth = 1000

        this.sonB.play();
        this.sonMarche.play();
        this.sonB.pause();
        this.sonMarche.pause();
        this.sonB.loop = true;
        this.sonMarche.loop = true;
        this.sonB.volume = 0.9;
        this.sonB.volume = 10;


        /////////////////////////////////POINTEUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        this.input.on('pointerdown', (pointer) => {
            if (pointer.rightButtonDown()) {
                isRightButtonDown = true;
            }
            if (pointer.leftButtonDown()) {
                isLeftButtonDown = true;
                if(surchauffe < 100){
                this.sonB.resume();
                }
            
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (!pointer.rightButtonDown()) {
                isRightButtonDown = false;
            }
            if (!pointer.leftButtonDown()) {
                isLeftButtonDown = false;
                this.sonB.pause();
                this.sonBF.play();
            }
        });



        this.arme = this.physics.add.sprite(91 * 64, 127 * 64, 'arme1');
        this.arme.setOrigin(0.5, 0.17);
        this.arme.setScale(1)
        //this.aimAngle = 0;
        //this.leftArm.play('gun-arm-idle');

        this.arme.body.allowGravity = false;

        /////////////////////////////////MI\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.MI_1 = this.physics.add.image(10 * 64, 6.5 * 64, 'MI')
            .setImmovable(true)
        this.MI_1.body.setAllowGravity(false);
        this.physics.add.collider(this.MI_1, this.player);

        this.MI_2 = this.physics.add.image(60 * 64, 6.5 * 64, 'MI')
            .setImmovable(true)
        this.MI_2.body.setAllowGravity(false);
        this.physics.add.collider(this.MI_2, this.player);
        /////////////////////////////////ASCENSEUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.ascenseur_1 = this.physics.add.image(14 * 64, 10.5 * 64, 'ascensseur')
            .setImmovable(true)
        this.ascenseur_1.body.setAllowGravity(false);
        this.physics.add.collider(this.ascenseur_1, this.player);


        this.ascenseur_2 = this.physics.add.image(55 * 64, 10.5 * 64, 'ascensseur')
            .setImmovable(true)
        this.ascenseur_2.body.setAllowGravity(false);
        this.physics.add.collider(this.ascenseur_2, this.player);

        this.HBA1 = this.physics.add.sprite(this.ascenseur_2.x, this.ascenseur_2.y - 128, "hb_ascensseur")

        this.physics.add.overlap(this.player, this.HBA1, this.ascenseur_2_move, null, this);
        this.physics.add.collider(this.ascenseur_2, this.base);
        this.physics.add.collider(this.ascenseur_2, this.HBA1);
        this.HBA1.body.allowGravity = true;

        /////////////////////////////////COLISION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


        this.physics.add.collider(this.tir_player, base1, this.destroylaser, null, this)


        /////////////////////////////////TP\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        this.tp = this.physics.add.group({ allowGravity: false, });
        this.tp1 = this.physics.add.image(65 * 64, 6 * 64, 'TP1');
        this.tp.add(this.tp1)
        this.physics.add.overlap(this.player, this.tp1, this.phase3, null, this);

        /////////////////////////////////ANIM\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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




        /////////////////////////////////SURCHAUFFE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


        this.anims.create({
            key: 'surchauffe_1',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_2',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_3',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 2, end: 2 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_4',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 3, end: 3 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_5',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 4, end: 4 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_6',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 5, end: 5 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_7',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 6, end: 6 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_8',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 7, end: 7 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'surchauffe_9',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 8, end: 8 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_10',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 9, end: 9 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_11',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 10, end: 10 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_12',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 11, end: 11 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_13',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 12, end: 12 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_14',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 13, end: 13 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_15',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 14, end: 14 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_16',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 15, end: 15 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_17',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 16, end: 16 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_18',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 17, end: 17 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_19',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 18, end: 18 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_20',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 19, end: 19 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_21',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 20, end: 20 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_22',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 21, end: 21 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_23',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 22, end: 22 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_24',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 23, end: 23 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_25',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 24, end: 24 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_26',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 25, end: 25 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_27',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 26, end: 26 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_28',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 27, end: 27 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_29',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 28, end: 28 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_30',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 29, end: 29 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_31',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 30, end: 30 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_32',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 31, end: 31 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_33',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 32, end: 32 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_34',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 33, end: 33 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_35',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 34, end: 34 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_36',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 35, end: 35 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_37',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 36, end: 36 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_38',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 37, end: 37 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_39',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 38, end: 38 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_40',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 39, end: 39 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_41',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 40, end: 40 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_42',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 41, end: 41 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_43',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 42, end: 42 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_44',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 43, end: 43 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_45',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 44, end: 44 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_46',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 45, end: 45 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_47',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 46, end: 46 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_48',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 47, end: 47 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_49',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 48, end: 48 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_50',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 49, end: 49 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_51',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 50, end: 51 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_52',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 52, end: 53 }),
            frameRate: 4,
            repeat: -1
        })




        this.anims.create({
            key: 'load',
            frames: this.anims.generateFrameNumbers('Loading', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });



        this.load = this.add.sprite(450, 300, 'Loading').setScale(5).setScrollFactor(0);
        this.load.play('load', true)
        this.load.depth = 1001
        this.clavier.enabled = false;
        setTimeout(() => {
            this.load.destroy()
            this.clavier.enabled = true;

        }, 5000);

    }



    update() {
        let angle = Phaser.Math.Angle.Between(this.arme.x, this.arme.y, this.input.activePointer.worldX, this.input.activePointer.worldY);
        this.arme.setRotation(angle);


        if (this.clavier.F.isDown && rechbouclier == true) {
            invinssible = true

            setTimeout(() => {
                usebouclier = false
                invinssible = false
            }, 10000);

            setTimeout(() => {
                rechbouclier = true
            }, 30000);
        }


        if (isLeftButtonDown && this.canshootA1) {
            //this.point.normalize()
            this.tir_player.create(this.player.x, this.player.y, "tire_p_A_1")
                .setVelocityX(Math.cos(angle) * 7500)
                .setVelocityY(Math.sin(angle) * 7500)
            if (surchauffe < 100) {
                this.canshootA1 = false
                
                
                setTimeout(() => {
                    this.canshootA1 = true
                    surchauffe += 1
                }, 50);
            }

            else {
                this.canshootA1 = false
                recharge = 1
                this.sonBF.play();
                this.sonB.pause();

                setTimeout(() => {
                    this.canshootA1 = true
                    surchauffe = 0
                    recharge = 0
                }, 6500);
            }

        }


        if (surchauffe > 0 && this.clavier.R.isDown && recharge == 0) {
            this.canshootA1 = false
            surchauffe = -200
            setTimeout(() => {
                this.canshootA1 = true
                surchauffe = 0
            }, 3000);
        }

        this.arme.x = this.player.x
        this.arme.y = this.player.y


        //if (this.clavier.E.isDown){

        //}







        if (this.player)

            if (this.clavier.Q.isDown) {
                this.player.setVelocityX(-600);
                if(this.player.body.velocity.y == 0){
                    this.sonMarche.resume();
                
                }
                //this.HB.x=this.player.x-32;
                //this.HB.y=this.player.y;
            }
            else if (this.clavier.D.isDown) {
                this.player.setVelocityX(600);
                if(this.player.body.velocity.y == 0){
                    this.sonMarche.resume();
                }
                //this.HB.x=this.player.x+32;
                //this.HB.y=this.player.y;
            }
            else {
                this.player.setVelocityX(0)
                this.sonMarche.pause();
                //this.player.anims.play('idle', true);
            }
        if (this.clavier.SPACE.isDown) {
            if (this.player.body.blocked.down) {
                this.player.setVelocityY(-1200);
                this.sonMarche.pause();

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


        if (surchauffe == 0) {
            this.surchauffeV.anims.play("surchauffe_1", true);
        }
        if (surchauffe == 2) {
            this.surchauffeV.anims.play("surchauffe_2", true);
        }
        if (surchauffe == 4) {
            this.surchauffeV.anims.play("surchauffe_3", true);
        }
        if (surchauffe == 6) {
            this.surchauffeV.anims.play("surchauffe_4", true);
        }
        if (surchauffe == 8) {
            this.surchauffeV.anims.play("surchauffe_5", true);
        }
        if (surchauffe == 10) {
            this.surchauffeV.anims.play("surchauffe_6", true);
        }
        if (surchauffe == 12) {
            this.surchauffeV.anims.play("surchauffe_7", true);
        }
        if (surchauffe == 14) {
            this.surchauffeV.anims.play("surchauffe_8", true);
        }
        if (surchauffe == 16) {
            this.surchauffeV.anims.play("surchauffe_9", true);
        }
        if (surchauffe == 18) {
            this.surchauffeV.anims.play("surchauffe_10", true);
        }
        if (surchauffe == 20) {
            this.surchauffeV.anims.play("surchauffe_11", true);
        }
        if (surchauffe == 22) {
            this.surchauffeV.anims.play("surchauffe_12", true);
        }
        if (surchauffe == 24) {
            this.surchauffeV.anims.play("surchauffe_13", true);
        }
        if (surchauffe == 26) {
            this.surchauffeV.anims.play("surchauffe_14", true);
        }
        if (surchauffe == 28) {
            this.surchauffeV.anims.play("surchauffe_15", true);
        }
        if (surchauffe == 30) {
            this.surchauffeV.anims.play("surchauffe_16", true);
        }
        if (surchauffe == 32) {
            this.surchauffeV.anims.play("surchauffe_17", true);
        }
        if (surchauffe == 34) {
            this.surchauffeV.anims.play("surchauffe_18", true);
        }
        if (surchauffe == 36) {
            this.surchauffeV.anims.play("surchauffe_19", true);
        }
        if (surchauffe == 38) {
            this.surchauffeV.anims.play("surchauffe_20", true);
        }
        if (surchauffe == 40) {
            this.surchauffeV.anims.play("surchauffe_21", true);
        }
        if (surchauffe == 42) {
            this.surchauffeV.anims.play("surchauffe_22", true);
        }
        if (surchauffe == 44) {
            this.surchauffeV.anims.play("surchauffe_23", true);
        }
        if (surchauffe == 46) {
            this.surchauffeV.anims.play("surchauffe_24", true);
        }
        if (surchauffe == 48) {
            this.surchauffeV.anims.play("surchauffe_25", true);
        }
        if (surchauffe == 50) {
            this.surchauffeV.anims.play("surchauffe_26", true);
        }
        if (surchauffe == 52) {
            this.surchauffeV.anims.play("surchauffe_27", true);
        }
        if (surchauffe == 54) {
            this.surchauffeV.anims.play("surchauffe_28", true);
        }
        if (surchauffe == 56) {
            this.surchauffeV.anims.play("surchauffe_29", true);
        }
        if (surchauffe == 58) {
            this.surchauffeV.anims.play("surchauffe_30", true);
        }
        if (surchauffe == 60) {
            this.surchauffeV.anims.play("surchauffe_31", true);
        }
        if (surchauffe == 62) {
            this.surchauffeV.anims.play("surchauffe_32", true);
        }
        if (surchauffe == 64) {
            this.surchauffeV.anims.play("surchauffe_33", true);
        }
        if (surchauffe == 66) {
            this.surchauffeV.anims.play("surchauffe_34", true);
        }
        if (surchauffe == 68) {
            this.surchauffeV.anims.play("surchauffe_35", true);
        }
        if (surchauffe == 70) {
            this.surchauffeV.anims.play("surchauffe_36", true);
        }
        if (surchauffe == 72) {
            this.surchauffeV.anims.play("surchauffe_37", true);
        }
        if (surchauffe == 74) {
            this.surchauffeV.anims.play("surchauffe_38", true);
        }
        if (surchauffe == 76) {
            this.surchauffeV.anims.play("surchauffe_39", true);
        }
        if (surchauffe == 78) {
            this.surchauffeV.anims.play("surchauffe_40", true);
        }
        if (surchauffe == 80) {
            this.surchauffeV.anims.play("surchauffe_41", true);
        }
        if (surchauffe == 82) {
            this.surchauffeV.anims.play("surchauffe_42", true);
        }
        if (surchauffe == 84) {
            this.surchauffeV.anims.play("surchauffe_43", true);
        }
        if (surchauffe == 86) {
            this.surchauffeV.anims.play("surchauffe_44", true);
        }
        if (surchauffe == 88) {
            this.surchauffeV.anims.play("surchauffe_45", true);
        }
        if (surchauffe == 90) {
            this.surchauffeV.anims.play("surchauffe_46", true);
        }
        if (surchauffe == 92) {
            this.surchauffeV.anims.play("surchauffe_47", true);
        }
        if (surchauffe == 94) {
            this.surchauffeV.anims.play("surchauffe_48", true);
        }
        if (surchauffe == 96) {
            this.surchauffeV.anims.play("surchauffe_49", true);
        }
        if (surchauffe == 98) {
            this.surchauffeV.anims.play("surchauffe_50", true);
        }
        if (surchauffe == 100) {
            this.surchauffeV.anims.play("surchauffe_51", true);
        }
        if (surchauffe < 0) {
            this.surchauffeV.anims.play("surchauffe_52", true);
        }


        const distance_souris = Phaser.Math.Distance.Between(this.input.activePointer.worldX, this.input.activePointer.worldY, this.player.x, this.player.y);
        distanceX = this.input.activePointer.worldX - this.player.x
        distanceY = this.input.activePointer.worldY - this.player.y
        if (isRightButtonDown) {
            if (distance_souris < 650) {
                this.cameras.main.centerOn(this.player.x + distanceX, this.player.y + distanceY)
            }
        } else {
            this.cameras.main.centerOn(this.player.x, this.player.y)
        }




    }




    ascenseur_2_move() {
        if (this.clavier.E.isDown && this.ascenseur_2.body.velocity.x == 0) {
            this.ascenseur_2.setVelocityX(400);
            setTimeout(() => {
                this.ascenseur_2.setVelocityX(0);
            }, 19385);

        }
    }
    destroylaser(laser, collide) {
        laser.destroy()
    }

    tirSUPP(laser, collide) {
        collide.destroy()
    }

    toucheplayer(laser, player) {
        player.destroy()
        HP -= 1
    }

    tourelleDegats(tir_player, tourelle) {
        tir_player.destroy()
        tourelle.vieTourelle -= 1
        if (tourelle.vieTourelle <= 0) {
            tourelle.destroy()
            tourelle.canshoot = false

        }
    }


    robotDegats(tir_player, robot) {
        tir_player.destroy()
        robot.vierobot -= 1
        if (robot.vierobot <= 0) {
            robot.destroy()
            robot.canshoot = false

        }
    }

    DG(generateur, tir_player) {
        tir_player.destroy()

        generateur.vieGenerateur -= 1
        console.log(generateur.vieGenerateur)

        if (generateur.vieGenerateur <= 0) {
            generateur.setVisible(false)

        }

    }
    //TSM(tourelle){
    //    
    //}


    //normalize()
    MR(robot, grp) {
        robot.setVelocityX(-robot.body.velocity.x)
    }


    phase3() {
        this.scene.start("partie_3")
    }
}

//////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

class partie_3 extends Phaser.Scene {
    constructor() {
        super('partie_3');
        this.canshootA1 = true
        this.isLeftButtonDown = false;

    }

    preload() {
        this.load.tilemapTiledJSON("partie_3", "maps/partie_3.json");
        this.load.image("phaser_assets", "maps/test.png");
        this.load.image('perso', 'sprites/test_perso.png');
        this.load.image('ascensseur', 'maps/ascensseur.png');
        this.load.image('heal', 'sprites/heal.png');
        this.load.image('hb_ascensseur', 'maps/hb_ascensseur.png');
        this.load.image('plateforme', 'maps/plateforme.png');
        this.load.image('arme1', 'sprites/arme_1.png');
        this.load.image('tourelle', 'sprites/tourelle.png');
        this.load.image('porteS1', 'sprites/porte_simple_1.png');
        this.load.image('porteS2', 'sprites/porte_simple_2.png');
        //this.load.image('TP1', 'maps/TP.png');
        this.load.image('MI', 'maps/murINV.png');
        this.load.image('generateur', 'sprites/generateur.png');
        this.load.image('HBZM', 'sprites/hb_z_m.png');
        this.load.image('porteL', 'sprites/porte_lourd.png');
        this.load.image('lazzzzzer', 'sprites/lazzzzzer.png');
        this.load.image('tire_p_A_1', 'sprites/tire_p_A_1.png');
        this.load.image('caisse', 'sprites/caisse.png');
        this.load.spritesheet('Loading', 'sprites/ecran_chargement.png',
            { frameWidth: 896, frameHeight: 448 });
        this.load.spritesheet('HP', 'sprites/barre_vie.png',
            { frameWidth: 1300, frameHeight: 200 });
        this.load.spritesheet('surchauffe', 'sprites/surchauffe.png',
            { frameWidth: 30, frameHeight: 60 });


        this.load.setPath('sound');

        this.load.setPath('sound');
        this.load.audio('B1', 'DBateuse_3.mp3');
        this.load.audio('B2', 'MBateuse_3.mp3');
        this.load.audio('B3', 'FBateuse_3.mp3');
        this.load.audio('CU', 'coup_unique.mp3');
        this.load.audio('M', 'marche.mp3');
        this.load.audio('PP', 'propulsion.mp3');
    }

    create() {

        
        this.sonTT = this.sound.add('CU');
        this.sonB = this.sound.add('B2');
        this.sonBF = this.sound.add('B3');
        this.sonMarche = this.sound.add('M');
        this.sonPropulsion = this.sound.add('PP');


        //input=this.input;
        const carteDuNiveau2 = this.add.tilemap("partie_3");
        const tileset2 = carteDuNiveau2.addTilesetImage("test", "phaser_assets");
        const base2 = carteDuNiveau2.createLayer('base2', tileset2);
        base2.setCollisionByProperty({ estSolide: true });
        this.player = this.physics.add.sprite(25 * 64, 7 * 64, 'perso');
        this.physics.add.collider(this.player, base2);
        this.cameras.main.zoom = 0.2;
        //this.cameras.main.startFollow(this.player);
        this.clavier = this.input.keyboard.addKeys('Q,D,S,E,R,X,F,SPACE,SHIFT');
        this.vie = this.add.sprite(-800, -600, 'HP').setScale(1.8).setScrollFactor(0);
        this.tir_player = this.physics.add.group({ gravity: false })
        this.cameras.main.centerOn(this.player.x, this.player.y)
        this.surchauffeV = this.add.sprite(-1650, 1000, 'surchauffe').setScale(12.8).setScrollFactor(0);
        this.surchauffeV.depth = 1000
        this.vie.depth = 1000
        
        this.sonB.play();
        this.sonMarche.play();
        this.sonB.pause();
        this.sonMarche.pause();
        this.sonB.loop = true;
        this.sonMarche.loop = true;
        this.sonB.volume = 0.9;
        this.sonB.volume = 10;

    /////////////////////////////////POINTEUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


        this.input.on('pointerdown', (pointer) => {
            if (pointer.rightButtonDown()) {
                isRightButtonDown = true;
            }
            if (pointer.leftButtonDown()) {
                isLeftButtonDown = true;
                if(surchauffe < 100){
                this.sonB.resume();
                }
            
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (!pointer.rightButtonDown()) {
                isRightButtonDown = false;
            }
            if (!pointer.leftButtonDown()) {
                isLeftButtonDown = false;
                this.sonB.pause();
                this.sonBF.play();
            }
        });


        this.arme = this.physics.add.sprite(91 * 64, 127 * 64, 'arme1');
        this.arme.setOrigin(0.5, 0.17);
        this.arme.setScale(1)
        //this.aimAngle = 0;
        //this.leftArm.play('gun-arm-idle');
        this.arme.body.allowGravity = false;
                
        this.heal = this.physics.add.group()
        this.heal.create(72 * 64, 13.5 * 64, 'heal').setScale(1.5);
        this.heal.create(28 * 64, 56.5 * 64, 'heal').setScale(1.5);
        this.physics.add.overlap(this.player, this.heal, function (player, heal) {
            if (HP < 11) {
                HP = 11
                heal.destroy()
            }
        }, null, this)
        /////////////////////////////////ENEMIES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        this.projectile_tourelle = this.physics.add.group();
        
        this.tourelle = this.physics.add.group({ immovable: true,  allowGravity:false});
        this.tourelle.create(49 * 64, 47.5 * 64, 'tourelle');         //0
        this.tourelle.create(62 * 64, 47.5 * 64, 'tourelle');         //1
        this.tourelle.create(77 * 64, 47.5 * 64, 'tourelle');         //2
        this.tourelle.create(88 * 64, 47.5 * 64, 'tourelle');         //3
        this.tourelle.create(70 * 64, 60.5 * 64, 'tourelle');         //4
        
        
        this.tourelle.getChildren()[0].vieTourelle = 4;
        this.tourelle.getChildren()[0].canshoot = true;
        this.tourelle.getChildren()[1].vieTourelle = 4;
        this.tourelle.getChildren()[1].canshoot = true;
        this.tourelle.getChildren()[2].vieTourelle = 4;
        this.tourelle.getChildren()[2].canshoot = true;
        this.tourelle.getChildren()[3].vieTourelle = 4;
        this.tourelle.getChildren()[3].canshoot = true;
        this.tourelle.getChildren()[4].vieTourelle = 4;
        this.tourelle.getChildren()[4].canshoot = true;
       
        /////////////////////////////////GENERATEUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        this.generateur_1 = this.physics.add.image(91 * 64, 8 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_1.depth = 1
        this.generateur_1.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_1, this.player);
        this.generateur_1.vieGenerateur = 20;

        this.generateur_2 = this.physics.add.image(53 * 64, 37.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_2.depth = 1
        this.generateur_2.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_2, this.player);
        this.generateur_2.vieGenerateur = 20;

        this.generateur_3 = this.physics.add.image(18 * 64, 51.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_3.depth = 1
        this.generateur_3.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_3, this.player);
        this.generateur_3.vieGenerateur = 20;

        this.generateur_4 = this.physics.add.image(11 * 64, 51.5 * 64, 'generateur')
            .setImmovable(true)
        this.generateur_4.depth = 1
        this.generateur_4.body.setAllowGravity(false);
        this.physics.add.collider(this.generateur_4, this.player);
        this.generateur_4.vieGenerateur = 20;

        /////////////////////////////////PORTE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.porte_1 = this.physics.add.image(51 * 64, 16 * 64, 'porteS1')
            .setImmovable(true)
        this.porte_1.body.setAllowGravity(false);
        this.physics.add.collider(this.porte_1, this.player);

        this.porte_2 = this.physics.add.image(83 * 64, 16 * 64, 'porteS1')
            .setImmovable(true)
        this.porte_2.body.setAllowGravity(false);
        this.physics.add.collider(this.porte_2, this.player);

        this.porte_3 = this.physics.add.image(35 * 64, 36 * 64, 'porteS2')
            .setImmovable(true)
        this.porte_3.body.setAllowGravity(false);
        this.physics.add.collider(this.porte_3, this.player);

        /////////////////////////////////MI\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.MI_1 = this.physics.add.image(20 * 64, 6.5 * 64, 'MI')
            .setImmovable(true)
        this.MI_1.body.setAllowGravity(false);
        this.physics.add.collider(this.MI_1, this.player);

        /////////////////////////////////caisse\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.caisse_1 = this.physics.add.image(19 * 64, 32 * 64, 'caisse')
        .setImmovable(true)
        this.caisse_1.body.setAllowGravity(false);
        this.physics.add.overlap(this.caisse_1, this.player,this.sautPP, null, this);

        /////////////////////////////////ASCENSEUR\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.ascenseur_1 = this.physics.add.image(25 * 64, 10.5 * 64, 'ascensseur')
            .setImmovable(true)
        this.ascenseur_1.body.setAllowGravity(false);
        this.physics.add.collider(this.ascenseur_1, this.player);

        this.HBA1 = this.physics.add.sprite(this.ascenseur_1.x, this.ascenseur_1.y - 128, "hb_ascensseur")

        this.physics.add.overlap(this.player, this.HBA1, this.ascenseur_1_move, null, this);
        this.physics.add.collider(this.ascenseur_1, this.HBA1);

        this.HBA1.body.allowGravity = true;

        /////////////////////////////////COLISION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.physics.add.collider(this.tourelle, base2);

        this.physics.add.collider(this.projectile_tourelle, base2, this.destroylaser, null, this)
        this.physics.add.collider(this.projectile_tourelle, this.player, this.toucheplayer, null, this)
        this.physics.add.collider(this.tir_player, base2, this.destroylaser, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_1, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_2, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_3, this.DG, null, this)
        this.physics.add.collider(this.tir_player, this.generateur_4, this.DG, null, this)
        this.physics.add.collider(this.heal, base2, this.DG, null, this)
        this.physics.add.collider(this.player, this.tp, this.P2, null, this);

        this.physics.add.collider(this.tir_player, this.porte_1, this.tirSUPP, null, this)
        this.physics.add.collider(this.tir_player, this.porte_2, this.tirSUPP, null, this)
        this.physics.add.collider(this.tir_player, this.porte_3, this.tirSUPP, null, this)
        this.physics.add.overlap(this.tir_player, this.tourelle, this.tourelleDegats, null, this)

        /////////////////////////////////TP\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        this.tp = this.physics.add.group({ allowGravity: false, });
        this.tp1 = this.physics.add.image(15 * 64, 6 * 64, 'TP1');
        this.tp.add(this.tp1)
        this.physics.add.overlap(this.player, this.tp1, this.phase2, null, this);


        /////////////////////////////////ANIM\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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




        /////////////////////////////////SURCHAUFFE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


        this.anims.create({
            key: 'surchauffe_1',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_2',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_3',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 2, end: 2 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_4',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 3, end: 3 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_5',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 4, end: 4 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_6',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 5, end: 5 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_7',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 6, end: 6 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_8',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 7, end: 7 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'surchauffe_9',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 8, end: 8 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_10',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 9, end: 9 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_11',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 10, end: 10 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_12',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 11, end: 11 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_13',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 12, end: 12 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_14',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 13, end: 13 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_15',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 14, end: 14 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_16',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 15, end: 15 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_17',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 16, end: 16 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_18',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 17, end: 17 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_19',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 18, end: 18 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_20',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 19, end: 19 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_21',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 20, end: 20 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_22',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 21, end: 21 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_23',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 22, end: 22 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_24',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 23, end: 23 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_25',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 24, end: 24 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_26',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 25, end: 25 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_27',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 26, end: 26 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_28',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 27, end: 27 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_29',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 28, end: 28 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_30',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 29, end: 29 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_31',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 30, end: 30 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_32',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 31, end: 31 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_33',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 32, end: 32 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_34',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 33, end: 33 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_35',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 34, end: 34 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_36',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 35, end: 35 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_37',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 36, end: 36 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_38',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 37, end: 37 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_39',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 38, end: 38 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_40',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 39, end: 39 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_41',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 40, end: 40 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_42',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 41, end: 41 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_43',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 42, end: 42 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_44',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 43, end: 43 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_45',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 44, end: 44 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_46',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 45, end: 45 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_47',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 46, end: 46 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_48',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 47, end: 47 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_49',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 48, end: 48 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_50',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 49, end: 49 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_51',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 50, end: 51 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'surchauffe_52',
            frames: this.anims.generateFrameNumbers('surchauffe', { start: 52, end: 53 }),
            frameRate: 4,
            repeat: -1
        })




        this.anims.create({
            key: 'load',
            frames: this.anims.generateFrameNumbers('Loading', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });



        this.load = this.add.sprite(450, 300, 'Loading').setScale(5).setScrollFactor(0);
        this.load.play('load', true)
        this.load.depth = 1001
        this.clavier.enabled = false;
        setTimeout(() => {
            this.load.destroy()
            this.clavier.enabled = true;

        }, 5000);

    }



    update() {
        let angle = Phaser.Math.Angle.Between(this.arme.x, this.arme.y, this.input.activePointer.worldX, this.input.activePointer.worldY);
        this.arme.setRotation(angle);


        if (this.clavier.F.isDown && rechbouclier == true) {
            invinssible = true

            setTimeout(() => {
                usebouclier = false
                invinssible = false
            }, 10000);

            setTimeout(() => {
                rechbouclier = true
            }, 30000);
        }


        if (isLeftButtonDown && this.canshootA1) {
            //this.point.normalize()
            this.tir_player.create(this.player.x, this.player.y, "tire_p_A_1")
                .setVelocityX(Math.cos(angle) * 7500)
                .setVelocityY(Math.sin(angle) * 7500)
            if (surchauffe < 100) {
                this.canshootA1 = false
                
                
                setTimeout(() => {
                    this.canshootA1 = true
                    surchauffe += 1
                }, 50);
            }

            else {
                this.canshootA1 = false
                recharge = 1
                this.sonBF.play();
                this.sonB.pause();

                setTimeout(() => {
                    this.canshootA1 = true
                    surchauffe = 0
                    recharge = 0
                }, 6500);
            }


        }


        if (surchauffe > 0 && this.clavier.R.isDown && recharge == 0) {
            this.canshootA1 = false
            surchauffe = -200
            setTimeout(() => {
                this.canshootA1 = true
                surchauffe = 0
            }, 3000);
        }

        this.arme.x = this.player.x
        this.arme.y = this.player.y


        if (this.clavier.X.isDown && cap1 == true ){
            cap1 = false
            this.sonPropulsion.play();
            this.player.setVelocityY(-2000)
            setTimeout(() => {
                this.player.setVelocityY(0)
            }, 2000);
            setTimeout(() => {
                cap1 = true
            }, 10000)




        }

        if (this.tourelle.getChildren()[0]) {
            const distance1 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[0].x, this.tourelle.getChildren()[0].y, this.player.x, this.player.y);
            if (distance1 < 3000) {
                if (this.tourelle.getChildren()[0].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[0].x, this.tourelle.getChildren()[0].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[0].x).setVelocityY(this.player.y - this.tourelle.getChildren()[0].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[0].canshoot = false
                    setTimeout(() => {
                        this.tourelle.getChildren()[0].canshoot = true
                    }, 2500);
                }
            }
        }

        if (this.tourelle.getChildren()[1]) {
            const distance2 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[1].x, this.tourelle.getChildren()[1].y, this.player.x, this.player.y);
            if (distance2 < 3000) {
                if (this.canshoot2 == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[1].x, this.tourelle.getChildren()[1].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[1].x).setVelocityY(this.player.y - this.tourelle.getChildren()[1].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[1].canshoot = false
                    setTimeout(() => {
                        this.canshoot2 = true
                    }, 1000);
                }
            }
        }

        if (this.tourelle.getChildren()[2]) {
            const distance3 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[2].x, this.tourelle.getChildren()[2].y, this.player.x, this.player.y);
            if (distance3 < 3000) {
                if (this.tourelle.getChildren()[2].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[2].x, this.tourelle.getChildren()[2].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[2].x).setVelocityY(this.player.y - this.tourelle.getChildren()[2].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[2].canshoot = false
                    setTimeout(() => {
                        this.tourelle.getChildren()[2].canshoot = true
                    }, 2000);
                }
            }
        }

        if (this.tourelle.getChildren()[3]) {
            const distance4 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[3].x, this.tourelle.getChildren()[3].y, this.player.x, this.player.y);
            if (distance4 < 3000) {
                if (this.tourelle.getChildren()[3].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[3].x, this.tourelle.getChildren()[3].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[3].x).setVelocityY(this.player.y - this.tourelle.getChildren()[3].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[3].canshoot = false
                    setTimeout(() => {
                        this.tourelle.getChildren()[3].canshoot = true
                    }, 2200);
                }
            }
        }

        if (this.tourelle.getChildren()[4]) {
            const distance5 = Phaser.Math.Distance.Between(this.tourelle.getChildren()[4].x, this.tourelle.getChildren()[4].y, this.player.x, this.player.y);
            if (distance5 < 3000) {
                if (this.tourelle.getChildren()[4].canshoot == true) {
                    this.projectile_tourelle.create(this.tourelle.getChildren()[4].x, this.tourelle.getChildren()[4].y, "lazzzzzer").setVelocityX(this.player.x - this.tourelle.getChildren()[4].x).setVelocityY(this.player.y - this.tourelle.getChildren()[4].y).body.setAllowGravity(false)
                    this.tourelle.getChildren()[4].canshoot = false
                    setTimeout(() => {
                        this.tourelle.getChildren()[4].canshoot = true
                    }, 1900);
                }
            }
        }

        
        //if (this.clavier.E.isDown){

        //}


        if (this.generateur_1.vieGenerateur <= 0) {
            setTimeout(() => {
                this.porte_2.destroy()
            }, 5000);
        }

        if (this.generateur_4.vieGenerateur <= 0 && this.generateur_3.vieGenerateur <= 0) {
            setTimeout(() => {
                this.porte_3.destroy()
            }, 5000);
        }

        if (this.generateur_2.vieGenerateur <= 0 ) {
            setTimeout(() => {
                this.porte_1.destroy()
            }, 5000);
        }



        if (this.player)

            if (this.clavier.Q.isDown) {
                this.player.setVelocityX(-600);
                if(this.player.body.velocity.y == 0){
                    this.sonMarche.resume();
                
                }
                //this.HB.x=this.player.x-32;
                //this.HB.y=this.player.y;
            }
            else if (this.clavier.D.isDown) {
                this.player.setVelocityX(600);
                if(this.player.body.velocity.y == 0){
                    this.sonMarche.resume();
                }
                //this.HB.x=this.player.x+32;
                //this.HB.y=this.player.y;
            }
            else {
                this.player.setVelocityX(0)
                this.sonMarche.pause();
                //this.player.anims.play('idle', true);
            }
        if (this.clavier.SPACE.isDown) {
            if (this.player.body.blocked.down) {
                this.player.setVelocityY(-1200);
                this.sonMarche.pause();

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


        if (surchauffe == 0) {
            this.surchauffeV.anims.play("surchauffe_1", true);
        }
        if (surchauffe == 2) {
            this.surchauffeV.anims.play("surchauffe_2", true);
        }
        if (surchauffe == 4) {
            this.surchauffeV.anims.play("surchauffe_3", true);
        }
        if (surchauffe == 6) {
            this.surchauffeV.anims.play("surchauffe_4", true);
        }
        if (surchauffe == 8) {
            this.surchauffeV.anims.play("surchauffe_5", true);
        }
        if (surchauffe == 10) {
            this.surchauffeV.anims.play("surchauffe_6", true);
        }
        if (surchauffe == 12) {
            this.surchauffeV.anims.play("surchauffe_7", true);
        }
        if (surchauffe == 14) {
            this.surchauffeV.anims.play("surchauffe_8", true);
        }
        if (surchauffe == 16) {
            this.surchauffeV.anims.play("surchauffe_9", true);
        }
        if (surchauffe == 18) {
            this.surchauffeV.anims.play("surchauffe_10", true);
        }
        if (surchauffe == 20) {
            this.surchauffeV.anims.play("surchauffe_11", true);
        }
        if (surchauffe == 22) {
            this.surchauffeV.anims.play("surchauffe_12", true);
        }
        if (surchauffe == 24) {
            this.surchauffeV.anims.play("surchauffe_13", true);
        }
        if (surchauffe == 26) {
            this.surchauffeV.anims.play("surchauffe_14", true);
        }
        if (surchauffe == 28) {
            this.surchauffeV.anims.play("surchauffe_15", true);
        }
        if (surchauffe == 30) {
            this.surchauffeV.anims.play("surchauffe_16", true);
        }
        if (surchauffe == 32) {
            this.surchauffeV.anims.play("surchauffe_17", true);
        }
        if (surchauffe == 34) {
            this.surchauffeV.anims.play("surchauffe_18", true);
        }
        if (surchauffe == 36) {
            this.surchauffeV.anims.play("surchauffe_19", true);
        }
        if (surchauffe == 38) {
            this.surchauffeV.anims.play("surchauffe_20", true);
        }
        if (surchauffe == 40) {
            this.surchauffeV.anims.play("surchauffe_21", true);
        }
        if (surchauffe == 42) {
            this.surchauffeV.anims.play("surchauffe_22", true);
        }
        if (surchauffe == 44) {
            this.surchauffeV.anims.play("surchauffe_23", true);
        }
        if (surchauffe == 46) {
            this.surchauffeV.anims.play("surchauffe_24", true);
        }
        if (surchauffe == 48) {
            this.surchauffeV.anims.play("surchauffe_25", true);
        }
        if (surchauffe == 50) {
            this.surchauffeV.anims.play("surchauffe_26", true);
        }
        if (surchauffe == 52) {
            this.surchauffeV.anims.play("surchauffe_27", true);
        }
        if (surchauffe == 54) {
            this.surchauffeV.anims.play("surchauffe_28", true);
        }
        if (surchauffe == 56) {
            this.surchauffeV.anims.play("surchauffe_29", true);
        }
        if (surchauffe == 58) {
            this.surchauffeV.anims.play("surchauffe_30", true);
        }
        if (surchauffe == 60) {
            this.surchauffeV.anims.play("surchauffe_31", true);
        }
        if (surchauffe == 62) {
            this.surchauffeV.anims.play("surchauffe_32", true);
        }
        if (surchauffe == 64) {
            this.surchauffeV.anims.play("surchauffe_33", true);
        }
        if (surchauffe == 66) {
            this.surchauffeV.anims.play("surchauffe_34", true);
        }
        if (surchauffe == 68) {
            this.surchauffeV.anims.play("surchauffe_35", true);
        }
        if (surchauffe == 70) {
            this.surchauffeV.anims.play("surchauffe_36", true);
        }
        if (surchauffe == 72) {
            this.surchauffeV.anims.play("surchauffe_37", true);
        }
        if (surchauffe == 74) {
            this.surchauffeV.anims.play("surchauffe_38", true);
        }
        if (surchauffe == 76) {
            this.surchauffeV.anims.play("surchauffe_39", true);
        }
        if (surchauffe == 78) {
            this.surchauffeV.anims.play("surchauffe_40", true);
        }
        if (surchauffe == 80) {
            this.surchauffeV.anims.play("surchauffe_41", true);
        }
        if (surchauffe == 82) {
            this.surchauffeV.anims.play("surchauffe_42", true);
        }
        if (surchauffe == 84) {
            this.surchauffeV.anims.play("surchauffe_43", true);
        }
        if (surchauffe == 86) {
            this.surchauffeV.anims.play("surchauffe_44", true);
        }
        if (surchauffe == 88) {
            this.surchauffeV.anims.play("surchauffe_45", true);
        }
        if (surchauffe == 90) {
            this.surchauffeV.anims.play("surchauffe_46", true);
        }
        if (surchauffe == 92) {
            this.surchauffeV.anims.play("surchauffe_47", true);
        }
        if (surchauffe == 94) {
            this.surchauffeV.anims.play("surchauffe_48", true);
        }
        if (surchauffe == 96) {
            this.surchauffeV.anims.play("surchauffe_49", true);
        }
        if (surchauffe == 98) {
            this.surchauffeV.anims.play("surchauffe_50", true);
        }
        if (surchauffe == 100) {
            this.surchauffeV.anims.play("surchauffe_51", true);
        }
        if (surchauffe < 0) {
            this.surchauffeV.anims.play("surchauffe_52", true);
        }


        const distance_souris = Phaser.Math.Distance.Between(this.input.activePointer.worldX, this.input.activePointer.worldY, this.player.x, this.player.y);
        distanceX = this.input.activePointer.worldX - this.player.x
        distanceY = this.input.activePointer.worldY - this.player.y
        if (isRightButtonDown) {
            if (distance_souris < 650) {
                this.cameras.main.centerOn(this.player.x + distanceX, this.player.y + distanceY)
            }
        } else {
            this.cameras.main.centerOn(this.player.x, this.player.y)
        }




    }

    ascenseur_1_move() {
        if (this.clavier.E.isDown && this.ascenseur_1.body.velocity.x == 0) {
            this.ascenseur_1.setVelocityX(-400);
            setTimeout(() => {
                this.ascenseur_1.setVelocityX(0);
            }, 19385);

        }
    }


    destroylaser(laser, collide) {
        laser.destroy()
    }

    tirSUPP(laser, collide) {
        collide.destroy()
    }

    toucheplayer(laser, player) {
        player.destroy()
        HP -= 1
    }

    sautPP(){
        this.caisse_1.destroy()
        cap1 = true
    }

    tourelleDegats(tir_player, tourelle) {
        tir_player.destroy()
        tourelle.vieTourelle -= 1
        if (tourelle.vieTourelle <= 0) {
            tourelle.destroy()
            tourelle.canshoot = false

        }
    }


    robotDegats(tir_player, robot) {
        tir_player.destroy()
        robot.vierobot -= 1
        if (robot.vierobot <= 0) {
            robot.destroy()
            robot.canshoot = false

        }
    }

    DG(generateur, tir_player) {
        tir_player.destroy()

        generateur.vieGenerateur -= 1

        if (generateur.vieGenerateur <= 0) {
            generateur.setVisible(false)

        }

    }
    //TSM(tourelle){
    //    
    //}


    //normalize()
    MR(robot, grp) {
        robot.setVelocityX(-robot.body.velocity.x)
    }


}