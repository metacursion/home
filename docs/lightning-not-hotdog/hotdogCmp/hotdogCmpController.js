({
	handleFilesChange: function(component, event, helper) {
		const file = event.getSource().get("v.files")[0]
		let fr = new FileReader();
		fr.onload = function() {
			var fileContents = fr.result;
			var base64Mark = 'base64,';
			var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
			fileContents = fileContents.substring(dataStart);
			component.set('v.image', 'data:image/png;base64,'+fileContents)
			const key = 'AIzaSyAlowvAvbKZ9wKD_RVyVhxfPuM_I_HkWuw'
			const endpoint = "https://vision.googleapis.com/v1/images:annotate?key="
			let body = {
				requests: [{
					image: {
						content: fileContents
					},
					features: [{
						type: "LABEL_DETECTION",
						maxResults: 15
					}]
				}]
			}
			fetch(endpoint + key, {
				method: 'POST',
				body: JSON.stringify(body)
			}).then(m => m.json()).then(i => {
					if(i.responses[0].labelAnnotations.filter(i => i.description == 'hot dog').length > 0){
						component.set('v.result', 'hotdog')
					} else {
						component.set('v.result', 'not hotdog')
					}
					
			})
		};
		fr.readAsDataURL(file);
	}
})