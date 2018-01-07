// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Shoot extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    distance: int = 1000;

    @property
    delay: int = 1;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    	this.move = cc.moveBy(this.delay, cc.p(this.distance, 0));
    	this.node.runAction(
    		cc.sequence(this.move, cc.removeSelf())
    	);
    },

    // update (dt) {},
}
