/* global $ */

$(function(){
	
	$.get('/cities', appendToSection);
	
	function appendToSection(cities){
		var list = [];
		var content, city;
		for(var i in cities){
			city = cities[i];
			content = '<a href="/cities/'+city+'" value='+city+' >'+city+'</a> '+' <a href="#" data-block="'+city+'"><i class="fa fa-trash-o" aria-hidden="true"></i></a>';
			list.push($('<li>', {html: content}));
		}
		$(".citiesList").append(list);
	}
	
	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		console.log(form)
		console.log(this);
		var cityData = form.serialize();
		console.log(cityData);
		
		$.ajax({
			type: 'POST',
			url: '/cities', 
			data: cityData
		}).done(function(cityName){
			appendToSection([cityName]);
			form.trigger('reset');
		});
	});
	
	$('.citiesList').on('click', 'a[data-block]', function(event){
		if(!confirm('Are you sure?')){
			return false;
		}
		var target = $(event.currentTarget);
		
		$.ajax({
			type:'DELETE',
			url: '/cities/' + target.data('city')
		}).done(function(){
			target.parents('li').remove();
		})
	})
	// document.getElementById("citiesList").onchange = function(){
	// 	var selected= document.getElementById("citiesList").value;
	// 	console.log(selected);
		
	// 	$.ajax({
	// 		type:'GET',
	// 		url:'/cities/'+selected,
	// 		// data:{'city':selected}
	// 	}).done(function(data){
	// 		console.log(data);
	// 		$('#cityStateDisplay').text(selected + " is in " + data);
	// 	});
		
	// };
});