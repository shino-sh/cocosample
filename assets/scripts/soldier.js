// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },

        shootPrefab: {
            default: null,
            type: cc.Prefab
        },

        distance: 30,
        delay: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.moveRight = false;
        this.shootFlg = false;
    },

    start () {
    	this.setInputControl();
    },

    update (dt) {
        var posX = this.node.x;
        var posY = this.node.y;

        if (this.moveRight) {
            this.move = cc.moveBy(this.delay, cc.p(this.distance, 0));
            this.node.runAction(this.move);
            // posX += 5;
        }
        if (this.jumpFlg) {
            this.jump = cc.moveBy(this.delay, cc.p(0, this.distance * 11));
            this.node.runAction(this.jump);
            // posY += 5;
        }
        if (this.shootFlg) {
            this.shoot();
        }

        // this.node.setPosition(posX, posY);
        this.moveRight = false;
        this.shootFlg = false;
        this.jumpFlg = false;
    },



    shoot () {
        var newShoot = cc.instantiate(this.shootPrefab);
        this.node.addChild(newShoot);
        newShoot.setPosition(cc.p(24, -3));
    },

    setInputControl () {
        var self = this;
        self.move = cc.moveBy(this.delay, cc.p(this.distance, 0));
        self.jump = cc.moveBy(this.delay, cc.p(0, this.distance));
        // self.node.runAction(self.move);
                        
        cc.eventManager.addListener({       
            event: cc.EventListener.KEYBOARD,
        
            onKeyPressed (keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.q:
                        self.moveRight = false;
                        self.shootFlg = false;
                        self.jumpFlg = true;
                        // self.node.runAction(self.jump);
                        break;
                    case cc.KEY.a:
                        self.moveRight = true;
                        self.shootFlg = false;
                        self.jumpFlg = false;
                        // self.node.runAction(self.move);
                        break;
                    case cc.KEY.s:
                        self.moveRight = false;
                        self.shootFlg = true;
                        self.jumpFlg = false;
                        break;
                    default:
                        self.moveRight = false;
                        self.shootFlg = false;
                        self.jumpFlg = false;
                        break;
                }
            }
        }, this.node)
    },

});
