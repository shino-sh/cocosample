// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
//  TODO 地面に足付いた判定

var ActionType = cc.Enum({
    Neutral: -1,
    MoveRight: -1,
    Jump: -1,
    Shoot: -1
});

var Soldier = cc.Class({
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

        distance: 8,
        delay: 0.1,
    },

    statics: {
        JUMP_ITERATIONS: 30,
        JUMP_ADD_SEP: 12
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var rigidBody = this.node.getComponent(cc.RigidBody);
        // contact listenerの有効化
        rigidBody.enabledContactListener = true;

        // action typeの初期化
        this.actionType = ActionType.Neutral;
        this.jumpIteration = 0;
        this.isStandingGround = true;

        // 各actionの設定
        this.moveRight = cc.moveBy(this.delay, cc.p(this.distance, 0));
        this.moveLeft = cc.moveBy(this.delay, cc.p(-1*this.distance, 0));
        //this.jump = cc.moveBy(1 / 60 * Soldier.JUMP_ADD_SEP, cc.p(0, 64));
    },

    start () {
    	this.setInputControl();
    },

    update (dt) {
        switch(this.actionType) {
            case ActionType.MoveRight:
                this.node.runAction(this.moveRight);
                break;
            case ActionType.MoveLeft:
                this.node.runAction(this.moveLeft);
                break;
            case ActionType.Jump:
                if (this.jumpIteration < Soldier.JUMP_ITERATIONS) {
                    //this.node.runAction(this.moveLeft);
                    var rigidBody = this.node.getComponent(cc.RigidBody);
                    rigidBody.linearVelocity = cc.v2(0, 160);
                    this.jumpIteration++;
                }
                break;
            case ActionType.Shoot:
                this.shoot();
                break;
        }

        //this.actionType = ActionType.Neutral;
    },

    //
    // Contact Callbacks
    //
    onBeginContact (contact, selfCollider, otherCollider) {
    },

    // will be called every time collider contact is resolved
    onPostSolve: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 1) {
            // ブロックと足の接触
            if (selfCollider.tag == 2) {
                this.isStandingGround = true;
                this.jumpIteration = 0;
            }
        }
    },

    shoot () {
        var newShoot = cc.instantiate(this.shootPrefab);
        this.node.addChild(newShoot);
        newShoot.setPosition(cc.p(24, -3));
    },

    setInputControl () {
        var self = this;

        cc.eventManager.addListener({       
            event: cc.EventListener.KEYBOARD,

            onKeyPressed (keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.left:
                        self.actionType = ActionType.MoveLeft;
                        break;
                    case cc.KEY.right:
                        self.actionType = ActionType.MoveRight;
                        break;
                    case cc.KEY.up:
                        if (self.isStandingGround) {
                            self.actionType = ActionType.Jump;
                        }
                        break;
                    case cc.KEY.a:
                        self.actionType = ActionType.Shoot;
                        break;
                    default:
                        self.actionType = ActionType.Neutral;
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.up:
                        self.jumpIteration = 0;
                        self.actionType = ActionType.Neutral;
                        self.isStandingGround = false;
                        break;
                    case cc.KEY.left:
                    case cc.KEY.right:
                    case cc.KEY.a:
                        self.actionType = ActionType.Neutral;
                        break;
                    default:
                        //self.jumpAction();
                        break;
                }
            },
        }, this.node)
    },

});
