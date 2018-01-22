/* global $ */

$(function(){
	
	$.get('/cities', appendToSection);
	
	function appendToSection(cities){
		var list = [];
		for(var i in cities){
			list.push($('<option>', {text: cities[i]}));
		}
		$(".citiesList").append(list);
	}
});