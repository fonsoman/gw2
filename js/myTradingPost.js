var access_token = "4D6153C1-F85E-E845-BA9B-75D89763E4458D02C2F9-F02B-4E7A-B69A-2FD35FEA4C81";
	
function nameFromId(arr) {
	var id_string = "";
	for(var i = 0; i < arr.length; i++) {
		if (i == arr.length-1) {
			id_string += arr[i].item_id;
		}
		else {
			id_string += arr[i].item_id + ',';
		}
	}
	
	var xmlhttp = new XMLHttpRequest();
	var url = "https://api.guildwars2.com/v2/items?ids=" + id_string;
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			for(var i = 0; i < myArr.length; i++) {
				$("#"+arr[i].item_id+" #name").html(myArr[i].name);
			}
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
}

function currentPrice(arr) {
	var id_string = "";
	for(var i = 0; i < arr.length; i++) {
		if (i == arr.length-1) {
			id_string += arr[i].item_id;
		}
		else {
			id_string += arr[i].item_id + ',';
		}
	}
	
	var xmlhttp = new XMLHttpRequest();
	var url = "https://api.guildwars2.com/v2/commerce/prices?ids=" + id_string;
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			for(var i = 0; i < myArr.length; i++) {
				$("#"+arr[i].item_id+" #currentSellPrice").html(myArr[i].sells['unit_price'] / 100);
			}
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function createEmptyRows(arr) {
	
	var out = "";
	for(var i = 0; i < arr.length; i++) {
		out += 	'<tr id="'+arr[i].item_id+'">' +
					'<td id="quantity"></td>'+
					'<td id="name"></td>' +
					'<td id="price"></td>' +
					'<td id="created"></td>' +
					'<td id="currentSellPrice"></td>' +
				'</tr>';
	}
	$("#tableContents").html(out);
}

function fillDataFromMainArray(arr) {
	for(var i = 0; i < arr.length; i++) {
		$("#"+arr[i].item_id+" #quantity").html(arr[i].quantity);
		$("#"+arr[i].item_id+" #price").html(arr[i].price / 100);
		$("#"+arr[i].item_id+" #created").html(arr[i].created);
	}
}

function myTradingPost(id, current_history, buys_sells) {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://api.guildwars2.com/v2/commerce/transactions/"+current_history+"/"+buys_sells+"?access_token=" + escape(access_token);
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			if (typeof myArr[0] !== 'undefined' && myArr[0] !== null) {
				createEmptyRows(myArr);
				fillDataFromMainArray(myArr);
				nameFromId(myArr);
				currentPrice(myArr)
			}
			else {
				$("#tableContents").html("No Results");
			}
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}