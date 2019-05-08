<template>
    <!--右侧滑入框 start-->
    <div class="RightSlide pa pb40">
        <h3 class="RightSlideTit clearfix pl25 pr25">
            <span class="fl f18"><Icon class="mr10 f20" color="#2299ee" type="person"></Icon><span>隋长材</span></span>
            <a href="javascript:;" class="f_6 fr f14"><Icon size="16" type="trash-a"></Icon>删除</a>
            <span class="fr ml10 mr10">|</span>
            <a href="javascript:;" class="f_6 fr f14"><Icon type="edit"></Icon>编辑</a>
        </h3>
        <div class="pl25 pr25 pb40 RightSubTit f16 clearfix">
            <span class="fl">基本信息</span>
            <span class="fl bgLine"></span>
        </div>
        <ul class="pl25 pr25 baseList clearfix">
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">用户ID</span>
                <span class="f14 fl baseCon">8</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">真实姓名</span>
                <span class="f14 fl baseCon">隋长材</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">昵称</span>
                <span class="f14 baseCon">隋长材</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">性别</span>
                <span class="f14 fl baseCon">男</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">邮箱</span>
                <span class="f14 fl baseCon">11233534@qq.com</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">出生日期</span>
                <span class="f14 fl baseCon">1990-09-09</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">籍贯</span>
                <span class="f14 baseCon">山东省济南市历下区</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">详细地址</span>
                <span class="f14 fl baseCon">舜华南路2000号汉峪金谷A3-5</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">电话</span>
                <span class="f14 fl baseCon">0531-9898787</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">手机号</span>
                <span class="f14 fl baseCon">1880442341</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">网址</span>
                <span class="f14 baseCon">www.zhenghe.cn</span>
            </li>
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">邮编</span>
                <span class="f14 fl baseCon">3254345</span>
            </li>
            <li class="clearfix fl" style="width:800px">
                <span class="baseTagName f_9 f14 fl">简介</span>
                <span class="f14 fl baseCon textoverflow" style="width: 720px;">政和科技员工，代号随风飘扬~~~政和科技员工，代号随风飘扬~~~政和科技员工，代号随风飘扬~~~</span>
            </li>
        </ul>
        <div class="pl25 pr25 pb40 RightSubTit f16 clearfix">
            <span class="fl">角色信息</span>
            <span class="fl bgLine"></span>
        </div>
        <ul class="pl25 pr25 baseList">
            <li class="clearfix fl">
                <span class="baseTagName f_9 f14 fl">角色</span>
                <span class="f14 fl baseCon">技术部管理员</span>
            </li>
        </ul>
    </div>
    <!--右侧滑入框 end-->
</template>

<script>
    export default {
        name: "user-detail",
        data(){
            return {

            }
        },
        method: {

        },
        created(){

        },
        mounted(){

        }
    }
</script>

<style scoped>
    .RightSlide{
        width: 970px;
        height: auto;
        background-color: #fff;
        top: 0;
        right: 0;
        z-index: 10;
        box-shadow: 0px 0px 6px #ddd;
    }
    .RightSlideTit{
        width: 100%;
        height: 67px;
        line-height: 67px;
        border-bottom: 2px solid #2299ee;
    }
    .RightSubTit{
        padding: 20px 25px 5px 25px;
    }
    .RightSubTit .bgLine{
        width: 92%;
        height: 2px;
        background: url("../../../assets/images/bgLine.jpg") repeat-x center;
        padding-top: 20px;
        margin-left: 8px;
    }
    .baseList li{
        width: 440px;
        height: 48px;
    }
    .baseTagName{
        width: 80px;
        height: 48px;
        line-height: 48px;
    }
    .baseCon{
        width: 360px;
        line-height: 48px;
    }
</style>
