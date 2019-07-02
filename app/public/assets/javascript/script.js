

$(document).on("ready", function () {
    //make 5 options for all 10 questions and append it to appropriate question area
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 5; j++) {
            var newLi = $("<li>");
            if (j === 2)
                newLi.append(`<input type="radio" value=` + parseInt(j + 1) + ` id="option` + i + j + `" name="question` + parseInt(i + 1) + `" checked=true/>`);
            else
                newLi.append(`<input type="radio" value=` + parseInt(j + 1) + ` id="option` + i + j + `" name="question` + parseInt(i + 1) + `" />`);
            newLi.append(`<label for="option` + i + j + `">` + parseInt(j + 1) + `</label>`)
            $("#optionsquestion" + parseInt(i + 1)).append(newLi);
        }
    }

    //remove placeholder on focus
    $("#name").on("focus", function () {
        $(this).attr("placeholder", "");
        $(".nameError").hide();
    })

    //get the placeholder back when focus is gone
    $("#name").on("blur", function () {
        $(this).attr("placeholder", "Name");
    })

    //remove placeholder on focus
    $("#photo").on("focus", function () {
        $(this).attr("placeholder", "");
        $(".photoError").hide();
    })

    //get the placeholder back when focus is gone
    $("#photo").on("blur", function () {
        $(this).attr("placeholder", "Photo URL");
    })

    //when submit is clicked
    $("#find-btn").on("click", function (event) {
        event.preventDefault();

        //hide errors if shown earlier and add data-target attribute to submit button
        $(".nameError").hide();
        $(".photoError").hide();
        $(this).attr("data-target", "#friendModal");

        //If name or photoURl is empty
        if ($("#name").val().trim() === "" || $("#photo").val().trim() === "") {

            //if name is empty, show error label and remove data-target attribute from submit button
            if ($("#name").val().trim() === "") {
                $(".nameError").show();
                $(this).attr("data-target", "");
            }
            //if photoURL is empty, show error label and remove data-target attribute from submit button
            if ($("#photo").val().trim() === "") {
                $(".photoError").show();
                $(this).attr("data-target", "");
            }
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        }
        //if neither name nor photoURL is empty
        else {
            var answersArray = [];
            //push answers in answerArray(in string form)
            for (var i = 0; i < 10; i++)
                answersArray.push($("input[name=question" + parseInt(i + 1) + "]:checked").val());

            //create new object for the user to post
            var newPerson = {
                name: $("#name").val(),
                photoURL: $("#photo").val(),
                answers: answersArray
            };
            $("#name").val("");
            $("#photo").val("")
            //post the users information in the new object to the server
            $.post("/api/friends", newPerson, function (data) {

                //once the server stores the new user's information, we send 
                //a get request to get back the closest matching user's information and display it in modal
                $.get("/api/match", function (data) {
                    $("#friendModalLabel").text(data.name);
                    $("#friendPicture").attr("alt", data.photoUrl);
                    $("#friendPicture").attr("src", data.photoUrl);
                    $("#friendPicture").css("max-height", "300px");
                });
            });
        }
    });
});
