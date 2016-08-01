var cookies = {},
	table;

//Добавим куков для демонстрации работы страницы
document.cookie = 'AreYouReadyKids=YesCaptain';
document.cookie = 'ICantHearYou=YesCaptain';

showTable();
table.addEventListener('click', deleteCookie);


function showTable() {
	table = document.createElement('table');
	table.innerHTML = ' \
	<tr> \
		<td>Cookies Sheet</td><td></td><td></td> \
	</tr> \
	<tr> \
		<td>Name</td><td>Value</td><td></td> \
	</tr> \
	';
	document.body.appendChild(table);
	fillTable();
};

function fillTable() {
	cookies = getCookies() || console.log('There are no cookies');
	for(cookieName in cookies) postToTable(cookieName);
};
function refillTable() {
	rows = document.querySelectorAll('.row');
	for(key in rows) {
		if(typeof rows[key] === 'object')
			rows[key].parentNode.removeChild(rows[key]);
	}
	fillTable();
};

function postToTable(cookieName) {
	var row = document.createElement('tr');
	row.classList.add('row')
	row.innerHTML = ' \
	<td id="name">' + cookieName + '</td> \
	<td id="value">' + cookies[cookieName] + '</td> \
	<td id="deleteCookie"><button id="' + cookieName + '">Удалить печеню</button></td> \
	';
	table.appendChild(row);
};

function deleteCookie(event) {
	if (!event.target.closest("button")) return;
	var date = new Date;
	var cookieName = event.target.getAttribute('id');
	if(!confirm('Удалить cookie с именем ' + cookieName +'?')) return;
	date.setDate(date.getDate() - 1);
	document.cookie = cookieName + '=' + cookies[cookieName] + '; expires=' + date.toUTCString();
	refillTable()
};


function getCookies() {
	if(!document.cookie) return;
	var cooks = document.cookie.split(';');
	var cooksObj = {};
	cooks.forEach((item) => {
		cooksObj[item.split('=')[0]] = item.split('=')[1];
	});
	return cooksObj;
};

