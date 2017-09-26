$(window).on('beforeunload.editpost', function(event){
	console.log(event.namespace);
}).on("unload", function(){
	console.log("unloading");
});