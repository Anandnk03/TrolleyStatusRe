var date = new Date().toDateString();
var time = new Date().toLocaleTimeString();
document.getElementById('currentDate').innerHTML += date + '-' + time;
console.log(time);

var options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
async function callAPI() {
  //alert("OK THE BUTTON")
  const response = await fetch(
    'http://10.117.63.10/RESTServiceMaster/RestService.svc/GetTrollStatuseKanbanRe'
  );
  const data = await response.json();
  var fetched = data.GetTrollStatuseKanbanReResult;
  /// josn parse codtions
  fetched = JSON.parse(fetched);
  console.log(fetched);
  var fetcheds = fetched.trolly;
  fetcheds.map((value, index) => {
    let table = '';
    let tdSuccess = `<td class="bg-success"></td>`;
    let tdDanger = `<td class="bg-danger"></td>`;

    switch (value.CELL) {
      case 'CoverRH':
        table = `
            ${value.IsEmpty == 'True' ? tdDanger : tdSuccess}
            <td></td>
            <td></td>
          `;
        break;
      case 'SuperMarket':
        table = `
            <td></td>
            ${value.IsEmpty == 'True' ? tdDanger : tdSuccess}
            <td></td>
          `;
        break;

      case 'AutoAssembly':
        table = `
          <td></td>
          <td></td>
          ${value.IsEmpty == 'True' ? tdDanger : tdSuccess}
            `;
        break;

      default:
        table = `
          <td></td>
          <td></td>
          <td></td>
          `;
        break;
    }

    $('#table-body').append(` <tr>
    <th class="NameClasss"">${value.Trolley_Name}</th>
    ${table}
  </tr>`);
  });
}
callAPI();
