function initialize() {
	const uploadBtn = document.getElementById('upload');
	uploadBtn.onchange = function() {
		const formData = new FormData();
		formData.append('upload', uploadBtn.files[0]);
		fetch('/uploadImage', {
			method: 'POST',
			body: formData,
		}).then(function() {
			getAndDisplayFiles();
		})
	}

	function getAndDisplayFiles() {
		fetch('/getImages').then(function(response) {
			response.json().then(function(files) {
				console.log('got files list:', files);
				const list = document.getElementById('pictures-list');
				list.innerHTML = '';
				for (const file of files) {
					const item = document.createElement('li');
					item.innerHTML = file;
					const img = new Image();
					img.src = '/getPic/' + file;
					item.appendChild(img);
					list.appendChild(item);
				}
			});
		})
	}

	getAndDisplayFiles();
}