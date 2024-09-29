

$(document).ready(()=>{
    $("#addRow").click((e)=>{
        e.preventDefault();
        
        var date = $("#insertForm #date").val();
        var start = $("#insertForm #start").val();
        var end = $("#insertForm #end").val();
        var description = $("#insertForm #description").val();
        var place = $("#insertForm #place").val();
        var type = $("#insertForm #type").val();
        var notes = $("#insertForm #notes").val();
        var flag = $("#insertForm #color").val();
        var availability = $("#insertForm input[name='availability']:checked").val();

        var rowSchedule = "<tr>
        <td>${date}</td>
        <td>${start}</td>
        <td>${end}</td>
        <td>${description}</td>
        <td>${place}</td>
        <td>${type}</td>
        <td>${notes}</td>
        <td style="background-color:${flag};"></td>
        <td>${availability ? `<img src="Icons/busy.png" alt="Not Available" id="IconPhoto">` : `<img src="Icons/available.png" alt="Available" id="IconPhoto">`}</td>
      </tr>";

        $('#agendaTable tbody').append(rowSchedule);
        $("#insertForm")[0].reset();
    });
});