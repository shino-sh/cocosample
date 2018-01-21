// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        soldierPrefab: {
            default: null,
            type: cc.Prefab
        },

        tiledMap: {
            default: null,
            type: cc.TiledMap,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.debugDrawFlags = 
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            // cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            // cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit;
        manager.gravity = cc.v2(0, -160);


        this.tiledMapOffset = this.tiledMap.node.position;
        this.tiledMapHeight = this.tiledMap.node.height;

        let objects = this.tiledMap.getObjectGroup("object1").getObjects();

        for(let i = 0; i < objects.length; i++){
            //
            // cc.Node
            //
            let newNode = new cc.Node();
            newNode.position = cc.v2(
                objects[i].offset.x + this.tiledMapOffset.x,
                this.tiledMapHeight - objects[i].objectSize.height - objects[i].offset.y + this.tiledMapOffset.y
            );
            newNode.anchorX = 0;
            newNode.anchorY = 0;
            newNode.size = objects[i].objectSize;

            //
            // cc.RigidBody
            //
            let rigidBody = newNode.addComponent(cc.RigidBody);
            rigidBody.type = cc.RigidBodyType.Static;
            
            //
            // cc.PhysicsBoxCollider
            //
            let boxCollider = newNode.addComponent(cc.PhysicsBoxCollider);
            // boxCollider.body = rigidBody;
            boxCollider.size = objects[i].objectSize;
            boxCollider.tag = 1;
            boxCollider.offset = cc.v2(
                objects[i].objectSize.width * 0.5,
                objects[i].objectSize.height * 0.5
            );

            this.node.addChild(newNode);
        }

        var newSoldier = cc.instantiate(this.soldierPrefab);
        // newSoldier.setPosition(cc.p(-350, 100));
        newSoldier.setPosition(cc.p(0, 100));
        this.node.addChild(newSoldier);
    },

    start () {

    },

    update: function (dt) {
    },

});
