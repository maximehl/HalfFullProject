var SLIDE_VALS = [];

$(document).ready(function(){
    $(".collapsible").each(function(){
        addCollapsibleTriggers($(this));
    });

    $(window).resize(function() {
        $(".collapsible").each(function() {
            if($(this).hasClass("shown")) {
                resize($(this));
            }
        })
    });

    $("#suggested").on("mouseleave", function(){
        //long, long list of suggestions
        var list = ["Call or text a friend or family member.", "Deep Dive: lower your face into a bowl of water to help calm you down in a crisis.",
            "Go out into nature! Find a park nearby or go for a walk around your neighborhood.",
            "Watch your favorite movie, with a friend or alone! Here's a <a href = 'https://www.doesthedogdie.com/'>helpful website</a> that tells you if something triggering happens.",
            "Volunteer at an animal shelter! Take care of something sweet and loving, and help people to boot.",
            "Play with Floofbunny!", "Sing along to your favorite song (or something that makes you pumped up) as loud as you can.",
            "Practice a skill!", "Play a video game where you're the hero.", "Meditate using a guided meditation video on YouTube or a free app like Insight Timer.",
            "Go out for a run or do something fun and physical with a friend or family member.", "Think carefully and slowly through the things overwhelming you. " +
            "Break them down until they seem manageable--it might take some time but it's worth it!", "Try looking for a therapist in your area with some of the resources above. " +
            "Talking through your thoughts and feelings with someone trained to listen might help!", "Go and sit in the sun! Feel the wind on your face, lie in the grass. " +
            "Remember, we are all parts of a grand, beautiful network of life!", "Try adopting a new hobby or skill.", "Try something you haven't done in a while.",
            "Vent! Let out your feelings. Write them down, scream into your pillow, talk to your parents, tell your friends, tell your dog, sing them out, tell a therapist, tell a stranger...",
            "Eat something healthy! Physical health and mental health are closely related!", "Get clean--take a shower, or pamper yourself with a bath bomb.", "Paint your nails, dress up nicely... even if you don't go anywhere, looking nice feels nice!", "Make yourself some of your favorite food or drink, or go and get it--bring a friend, if you want!",
            "Come out of your room. Even if you don't talk to your parents outright about what you're feeling, being with others often helps. Alone time is good, but company is too!", "Stick your head out the window and listen to the world around you. You're a big, important part of this big, important world!"
        ];
        //feeds a random suggestion from the list into the div
        $(this).html(list[Math.floor(Math.random() * list.length)]);
        resize($(this));
    });

    $("input").each(function(){
        $(this).on("click", function(){
            event.stopPropagation();
        });
        $(this).on("mouseup", function() {
            toNextItem($(this));
        });
    });

    $("#dia").on("click", function() {
        var slides = $("#slidecontainer");
        if($(this).hasClass("show")) {
            slides.css({"opacity": "100"});
            $(this).parent.click();
            $(this).removeClass("show");
            slides.click();
        } else {
            slides.css({"opacity": "0"});
            $(this).addClass("show");
        }
    });

});

function resize(inp) {
    inp.click();
    inp.click();
}

function toNextItem(inp) {
    var thisSlide;
    var nextSlide;

    //holds all values of sliders for later calculation
    SLIDE_VALS.push(parseInt(document.getElementById(inp.attr("id")).value));

    //saves current id #
    var currentNum = parseInt(inp.attr("id")[inp.attr("id").length-1]);

    //hides this slider/label set
    thisSlide = "#span"+currentNum;
    $(thisSlide).css({"display":"none"});

    //increments current number
    currentNum +=1;

    //if this was the last slider,
    if(currentNum === 10) {
        //calculates the numbers
        diagnoseTest(SLIDE_VALS);
    } else {
        //if not, shows the next slider/label set
        nextSlide = "#span"+(currentNum).toString();
        $(nextSlide).css({"display": "inline"});
        //and resizes the div to fit
        resize($("#slidecontainer"));
    }
}

function addCollapsibleTriggers(toggleObj) {
    toggleObj.css("height", toggleObj.children().first().outerHeight(true));

    toggleObj.on("click", function(){
        if($(this).hasClass("shown")){
            $(this).css("height", $(this).children().first().outerHeight(true));
            $(this).removeClass("shown");
        }else{
            $(this).parent().find(".collapsible").each(function(){
                $(this).removeClass("shown");
                $(this).css("height", $(this).children().first().outerHeight(true));
            });
            $(this).css("height", getHeightNeeded($(this)));
            $(this).addClass("shown");
        }
    });
}

function getHeightNeeded(toggleObj){
    var clone = toggleObj.clone().css("height", "auto").appendTo(toggleObj.parent());
    var heightNeeded = clone.height();
    clone.remove();
    return heightNeeded;
}

function diagnoseTest(array) {
    //assigns a weight to each of them--being suicidal is more worrying than insomnia
    var percentWeights = [.7, .8, .8, 1.3, .8, 1.5, 1.4, .7, 2];
    var total = 0;

    //if the value of the 'suicidal' or 'worthless' bar is too high, emergency mode
    if (array[8] >= 6 || array[6] > 8) {
        total += 60;
    }
    //add each array value multiplied by its weight to the total (should be 100 if all full)
    for (var i = 0; i < 9; i++) {
        total += array[i] * percentWeights[i]
    }

    if (total >= 80) {
        $("#special").html("Even if you aren't diagnosed with depression, you should talk to someone about how you've been feeling. This isn't a healthy mindspace, and if you get help, you can get out of it." +
            " Take a look through the hotlines and warmlines available at the top left, and try having a talk with someone you trust or" +
            " a trained professional about how you feel. Please remember that we care for you and you are important and worth far more than you might think.");
        //get help
    } else if (total >= 40) {
        $("#special").html("Even if you aren't diagnosed with depression, it looks like you need to get yourself out of the mental space you're in right now." +
            "Try 'filling your cup' with things you enjoy doing, spending time with people you like, and positive thinking--If you want a suggestion, click" +
            " on 'Fill your cup', and we'll think of something for you!");
        //coping methods
    } else {
        $("#special").html("Even if you aren't diagnosed with depression, you should remind yourself of how important you are and the effect you have on the world." +
            "Always remember that there are people who love you--try reaching out to some of them. Even if " +
            "you don't think they'll care, give your friends a call or text, or go talk to your parents about how you've been feeling--" +
            "it might help more than you think, and they'll be better able to support you if they know what you need. You are loved--you are worth it--no matter what.");
        //friends and family
    }
    //resizes div to fit the result
    resize($("#slidecontainer"));
}