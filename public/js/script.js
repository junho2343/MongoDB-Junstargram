var Init = new Init();
Init.Init();

function Init(){
    var cancel;
    this.Init = function(){
        cancel = $(".pop").html();
        Init.event();
    }
    this.event = function(){
        $(".card").on("click",function(){
            Init.card(this);
        })
        $(".pop").on("click",function(){
             Init.cancel();
            $(this).fadeOut();
        })
        $(window).on("click",function(){
            $(".hashtag_box").css({"display":"none"})
        })
    }
    this.card = function(th){
        var width=0;
            var height=0;
            var img_url = $(th).find("img").attr("src");
            var tag = $(th).find("p").text();
            tag = tag.replace(/\s/g, '');

            $(".pop").fadeIn();
            $(".pop").find("img").attr("src",img_url);
            $(".pop").find("p").text(tag);
            width = $(".pop").find("img").width();
            height = $(".pop").find("img").height();
          

            if(width > height){
                //width가 더 클경우
                var real_height =height*600/width;
                $(".pop").find("img").width(600);
                $(".pop").find("img").height(real_height);
                $(".pop .box").width(900);
            }else{
                //height가 더 클경우
                var real_width = width*600/height;
                $(".pop").find("img").width(real_width);
                $(".pop").find("img").height(600);
                $(".pop .box").width(real_width+300);
            }
            var temp = $(".pop .box").height()-16;
            $(".pop .box").height(temp);
            $(".pop .box").css({"margin-top":temp/2*-1});
    }
    this.search = function(value){
        $(".hashtag_box").empty();
        var cnt;
      
        var reg = new RegExp(value,"gi");
        $(".hashtag_box").css({"display":"block"});

   
        Object.keys(tag_data).forEach(function(key,i){
            if(key.match(reg)){
            console.log(key);
                $(".hashtag_box").append(`
                    <div class="box">
                        <div>
                            <span class="hashtag">#</span>
                            <span class="top">${key}</span>
                            <span class="bottom">게시물 ${tag_data[key]}</span>
                        </div>
                    </div>
                `);
            }

        })
        // console.log(tag_data);
    }
    this.cancel = function(){
        $(".pop").children().remove();
        $(".pop").html(cancel);
    }
}
