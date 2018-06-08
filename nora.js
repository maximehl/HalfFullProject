var SLIDE_VALS = [];
var CURRENT_SLIDE;

$(document).ready(function(){
    $(".collapsible").each(function(){
        addCollapsibleTriggers($(this));
    });

    var resizeTime;

    $(window).resize(function() {
        clearTimeout(resizeTime);
        resizeTime = setTimeout(resizingWindow, 250);
    });

    function resizingWindow() {
        $(".collapsible").each(function() {
            if($(this).hasClass("shown")) {
                resize($(this));
            }
        });
    }


    $("#suggested").on("click", function(){
        event.stopPropagation();
        //long, long list of suggestions
        var list = ["Call or text a friend or family member.", "Deep Dive: lower your face into a bowl of water to help calm you down in a crisis.",
            "Go out into nature! Find a park nearby or go for a walk around your neighborhood.",
            "Watch your favorite movie, with a friend or alone! Here's a <a href = 'https://www.doesthedogdie.com/'>helpful website</a> that tells you if something triggering happens.",
            "Volunteer at an animal shelter! Take care of something sweet and loving, and help people to boot.",
            "Play with Floofbunny!", "Sing along to your favorite song (or something that makes you pumped up) as loud as you can.",
            "Practice a skill you can do!", "Play a video game where you're the hero.",
            "Meditate using a guided meditation video on YouTube or a free app like Insight Timer.",
            "Go out for a run or do something fun and physical with a friend or family member.",
            "Think carefully and slowly through the things overwhelming you. Break them down until they seem manageable--it might take some time but it's worth it!",
            "Try looking for a therapist in your area with some of the resources above. Talking through your thoughts and feelings with someone trained to listen might help!",
            "Go and sit in the sun! Feel the wind on your face, lie in the grass. ", "Try adopting a new hobby or skill.",
            "Do something you haven't done in a while.", "Vent! Let out your feelings." +
            " Write them down, scream into your pillow, talk to your parents, tell your friends, tell your dog, sing them out, tell a therapist, tell a stranger...",
            "Eat something healthy! Physical health and mental health are closely related!", "Get clean--take a shower, or pamper yourself with a bath bomb.",
            "Paint your nails, dress up nicely... even if you don't go anywhere, looking nice feels nice!",
            "Make yourself some of your favorite food or drink, or go and get it--bring a friend, if you want!",
            "Come out of your room. Even if you don't talk to your family outright about what you're feeling, being with others often helps."+
            " Alone time is good, but company is too.", "Stick your head out the window and listen to the world around you.",
            "Slow down and take a deep breath. Where you are is okay--you're okay.", "Turn on some calming music or ambient noise--"+
            "it'll give you something else to focus on and might help you calm down. <a href = 'calm-youtube-playlist.html'>Here</a> are some of Nora's favorites."
        ];
        //feeds a random suggestion from the list into the div
        $(this).html(list[Math.floor(Math.random() * list.length)]);
        resize($(this).parent());
    });

    CURRENT_SLIDE = "slide0";

    $("input").each(function(){
        $(this).on("click", function() {
            event.stopPropagation();
        });
    });
    
    $("#continue").on("click", function() {
        event.stopPropagation();
        toNextItem(CURRENT_SLIDE);
    });

});

function resize(inp) {
    //resizes the resizable divs
    inp.click();
    inp.click();
}

function toNextItem(inp) {
    var currentNum;

    //holds all values of sliders for later calculation
    SLIDE_VALS.push(parseInt(document.getElementById(inp).value));

    currentNum = parseInt(inp[inp.length-1]);
    //saves current id #
    //have to make it so it stops at 'fidget' (9)
    if(inp.length > 6) {
        currentNum = parseInt("1" + currentNum);
    }

    //hides this slider/label set
    $("#span"+currentNum).css({"display":"none"});

    //increments current number
    currentNum +=1;

    CURRENT_SLIDE = "slide"+currentNum;

    //if this was the last slider,
    if(currentNum === 13) {
        //calculates the numbers
        diagnoseTest(SLIDE_VALS);
    } else {
        //if not, shows the next slider/label set
        $("#span"+(currentNum).toString()).css({"display": "inline"});
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
    var percentWeights = [.04, .09, .04, .04, .07, .04, .05, .09, .07, .05, .06, .18, .18];
    var total = 0;

    //if the value of the 'suicidal' or 'self harm' bar is too high, emergency mode
    if (array[12] >= 20 || array[11] >= 20) {
        total += 70;
    }
    console.log(array);
    //add each array value multiplied by its weight to the total
    for (var i = 0; i < percentWeights.length; i++) {
        total += array[i] * percentWeights[i]
    }
    console.log(total);
    $("#to-be-hidden").css({"display":"none"});

    if (total >= 75) {
        $("#special").html("We think you should talk to someone about how you've been feeling. This isn't a healthy space," +
            " and if you get help, you can get out of it. Take a look through the hotlines and warmlines available at the" +
            " top of this column, and try having a talk with someone you trust or a trained professional about how you feel." +
            " The coping methods in 'Fill your cup' might help, but we encourage you to do things with friends and spend time" +
            " in nature--you need to reset your brain and remind yourself how good life can be. You are loved, and you are worth" +
            " loving. Please take care of yourself, and always remember that you are worth far more than you might think.");
        //get help
    } else if (total >= 50) {
        $("#special").html("It looks like you need to get yourself out of the mental space you're in right now. Try 'filling" +
            " your cup' with things you enjoy doing, spending time with people you like, and (as cliche as it sounds)" +
            " positive thinking--If you want a suggestion, click on 'Fill your cup', and we'll think of something for you." +
            " You should consider sharing how you've been feeling with your friends and family, and keep in mind that you" +
            " won't feel like this forever--if it doesn't stop soon, or if it gets worse, you should definitely consider getting" +
            " help from a better source than us, like a therapist.");
        //coping methods
    } else if (total >= 25) {
        $("#special").html("It looks like you should remind yourself of how important you are, to others if not always yourself." +
            " Always remember that there are people who love you--try reaching out to some of them. Even if" +
            " you don't think they'll care, give your friends a call or text, or go talk to your parents about how you've" +
            " been feeling--it might help more than you think, and they'll be better able to support you if they know" +
            " what you need. You are loved--you are worth it--no matter what. Check out some of the tips, distractions," +
            " and coping methods in 'Fill your cup', and take care of yourself!");
        //friends and family
    } else {
        $("#special").html("We aren't experts, but we think you are probably healthy. Of course, we are just some strangers" +
            " on the Internet, so if you're really worried you have depression, you should definitely talk to others" +
            " who are probably better equipped to help you, but we in all our high school expertise think you're fine. If" +
            " you want to try some of the coping methods or distractions to 'fill your cup', click on that section, and if" +
            " you think we were wrong, you should tell your family and friends how you've been feeling, but if you think," +
            " this makes sense, take a deep breath and relax! Whatever made you come here, you can beat it--nothing can stop you.");
        //probably fine
    }
        $("#continue").css({"display": "none"});
        $(".t-f").css({"display": "none"});
        //resizes div to fit the result
        resize($("#slidecontainer"));
}