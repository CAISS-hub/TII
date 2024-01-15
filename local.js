top_doc = ''
cut_off = 0

mdsData = [];
function convert_data(data){
    //for (var i = 0; i < data[0].length; i++) {

    for (var i = 0; i < Object.keys(data[0]).length; i++) {
        var obj = {};
        for (var key in data) {
            obj[key] = data[key][i];
        }
        if (obj['Category']!='Default'){
            mdsData.push(obj);
            }
    }
    return mdsData
    }


function summ_hide(){
    $("#Summary_Overlay").css('visibility','hidden')
}

function hide_list(){
    if ($("#topic_ctrl").css('visibility') == 'visible'){
        $("#topic_ctrl").css('visibility','hidden')
    }else{
        $("#topic_ctrl").css('visibility','visible')
    }
}

 function invertBG(chkbx){
        if (chkbx.checked){
            $(".document").css("background", "black");
        }else{
            $(".document").css("background", "");
        }
 }

function toggle_doct(){
    convert("Summary_Overlay", doc_table)
    if ($("#Summary_Overlay").css('visibility') != 'visible'){
        $("#Summary_Overlay").css('visibility','visible')
    }else{
        $("#doc_table").css('visibility','hidden')
    }
}

function toggle_parat(){
    if ($("#para_table").css('visibility') == 'visible'){
        $("#para_table").css('visibility','hidden')
    }else{
        $("#para_table").css('visibility','visible')
    }
}
function toggle_sentt(){
    if ($("#sent_table").css('visibility') == 'visible'){
        $("#sent_table").css('visibility','hidden')
    }else{
        $("#sent_table").css('visibility','visible')
    }
}

function colour_table(tableID){
    $.map($("#"+tableID).find("td"), function( n, i ) {
        if (n.innerHTML == "NaN"){
            $(n).css("color","lawngreen")
        }else{
            value = parseFloat(n.innerHTML)
            $(n).css("background","rgb(128,"+Math.floor(value*255)+",128)")
        }
    });
}

function clear_table_colour(tableID){

    $.map($("#"+tableID).find("td"), function( n, i ) {
            $(n).css("color","black")
            $(n).css("background","lawngreen")
        }
    );
}

function hide_col_by_name(tableID, colName){
    $("#"+tableID)

}

 function Topic_Summary(checkobj){
    cut_off = $("#myRange").val()/100
    const loc_array = [];
    text = '<button type="button" onclick=summ_hide() name="cat_%s"> close</button><br/>\n'
    $.map($(".sentence").find("."+checkobj.name), function( n, i ) {
                        if (cut_off < parseFloat(n.getAttribute('value'))){
                            loc_array.push(n)
                            }
                    });
    text += ordered(loc_array)
    $("#Summary_Overlay").html(text)
    $("#Summary_Overlay").css('visibility','visible')
 }


 function ordered(array){
    type = $("#sort_type").val()
    if (type=="MsRel"){
        array.sort((a, b) => (parseFloat(a.getAttribute('value')) < parseFloat(b.getAttribute('value'))) ? 1 : -1)
        }
    if (type=="LtRel"){
        array.sort((a, b) => (parseFloat(a.getAttribute('value')) > parseFloat(b.getAttribute('value'))) ? 1 : -1)
        }
    text = ''
    array.forEach(function(n,i,arr){
        loc_loc = $(n).parents('.document')[0].id + $(n).parents('.sentence')[0].id
        text += '<div class="sum_sent">'+i.toString()+") "+$(n).text()+"("+n.getAttribute('value')+')('+loc_loc+')</div>';
    });
    return text
 }


 function Doc_Summary(checkobj){

    const loc_array = [];
    cut_off = $("#myRange").val()/100
    doc_id =  $("#doclist").val()
    text = '<button type="button" onclick=summ_hide() name="cat_%s"> close</button><br/>\n'
    $.map($("#"+doc_id).find(".sentence").find("."+checkobj.name), function( n, i ) {
                        if (cut_off < parseFloat(n.getAttribute('value'))){
                            loc_array.push(n)
                            }
                    });
    text += ordered(loc_array)
    $("#Summary_Overlay").html(text)
    $("#Summary_Overlay").css('visibility','visible')

 }

 function update(checkobj){
        //var entries = document.getElementsByClassName(checkobj.id);
        if (checkobj.checked){
            $.map($(".sentence").find("."+checkobj.id), function( n, i ) {
                        transpar = (parseFloat(n.getAttribute('value'))*1).toString()
                      $(n).css("background","rgba"+checkobj.value+","+transpar+")");
                    });
            //$(".sentence").find("."+checkobj.id).css("background", "rgba"+checkobj.value+",.attr('value')");
            //$(".sentence").find("."+checkobj.id).css("background", "rgb"+checkobj.value);
        }else{
            $(".sentence").find("."+checkobj.id).css("background", "");
        }
  }

  function select_doc(checkobj){
        //var entries = document.getElementsByClassName(checkobj.id);
        $("#"+checkobj.value).css("z-index", "5");
        if (top_doc!=''){
            $("#"+top_doc).css("z-index", "1");
        }
        top_doc = checkobj.value
  }


  function convert(table_layer, jsonData) {

         // Get the container element where the table will be inserted
         let container = $("#"+table_layer);
         let colour_button = $('<button>')
         colour_button.click(function(){
            colour_table(table_layer)
          });
         colour_button.text('colour table')
         container.append(colour_button)


         // Create the table element
         let table = $("<table>");
         let caption = $("<caption>")
         caption.text('table_layer')
         table.append(caption)

         // Get the keys (column names) of the first object in the JSON data
         let cols = Object.keys(jsonData[0]);

         // Create the header element
         let thead = $("<thead>");
         let tr = $("<tr>");

         // Loop through the column names and create header cells
         $.each(cols, function(i, item){
            let th = $("<th>");
            th.text(item); // Set the column name as the text of the header cell
            tr.append(th); // Append the header cell to the header row
         });
         thead.append(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table

         // Loop through the JSON data and create table rows
         $.each(jsonData, function(i, item){
         let tr = $("<tr>");

            // Get the values of the current object in the JSON data
            let vals = Object.values(item);

            // Loop through the values and create table cells
            $.each(vals, (i, elem) => {
               let td = $("<td>");
               td.text(elem); // Set the value as the text of the table cell
               tr.append(td); // Append the table cell to the table row
            });
            table.append(tr); // Append the table row to the table
         });
         container.append(table) // Append the table to the container element
  }