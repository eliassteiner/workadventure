import {gameManager} from "../Game/GameManager";
import {TextField} from "../Components/TextField";
import {TextInput} from "../Components/TextInput";
import {ClickButton} from "../Components/ClickButton";
import Image = Phaser.GameObjects.Image;
import Rectangle = Phaser.GameObjects.Rectangle;
import {PLAYER_RESOURCES} from "../Entity/PlayableCharacter";
import {cypressAsserter} from "../../Cypress/CypressAsserter";
import Sprite = Phaser.GameObjects.Sprite;

export const ReconnectingSceneName = "ReconnectingScene";
enum ReconnectingTextures {
    icon = "icon",
    mainFont = "main_font"
}

export class ReconnectingScene extends Phaser.Scene {
    private reconnectingField: TextField;
    private logo: Image;
    private cat: Sprite;

    constructor() {
        super({
            key: ReconnectingSceneName
        });
    }

    preload() {
        this.load.image(ReconnectingTextures.icon, "resources/logos/tcm_full.png");
        // Note: arcade.png from the Phaser 3 examples at: https://github.com/photonstorm/phaser3-examples/tree/master/public/assets/fonts/bitmap
        this.load.bitmapFont(ReconnectingTextures.mainFont, 'resources/fonts/arcade.png', 'resources/fonts/arcade.xml');
        this.load.spritesheet(
            'cat',
            'resources/characters/pipoya/Cat 01-1.png',
            {frameWidth: 32, frameHeight: 32}
        );
    }

    create() {
        this.logo = new Image(this, this.game.renderer.width - 30, this.game.renderer.height - 20, ReconnectingTextures.icon);
        this.add.existing(this.logo);

        this.reconnectingField = new TextField(this, this.game.renderer.width / 2, this.game.renderer.height / 2, "Connection lost. Reconnecting...");
        this.reconnectingField.setOrigin(0.5, 0.5).setCenterAlign();

        let cat = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 - 32, 'cat');
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('cat', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        cat.play('right');

    }
}
