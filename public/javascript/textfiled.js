function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}




const content = document.getElementById('content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})


const showCode = document.getElementById('show-code');
let active = false;

showCode.addEventListener('click', function () {
	showCode.dataset.active = !active;
	active = !active
	if(active) {
		content.textContent = content.innerHTML;
		content.setAttribute('contenteditable', false);
	} else {
		content.innerHTML = content.textContent;
		content.setAttribute('contenteditable', true);
	}
})



const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}

// Define the saveintovar function
function saveintovar() {
    let divElement = document.getElementById('content');
    let divText = divElement.textContent;
    let showelemtn = document.getElementById('showmytext');
    showelemtn.value = divText;
	let e= showelemtn.value;
	console.log(e);
}

// Function to simulate a button click
function clickSaveButton() {
    const saveButton = document.getElementById('show-code');
    saveButton.click(); // Trigger a click event on the button
}

// Simulate clicking the "Save" button before the saveintovar function


// Add an event listener to the form's submit event
const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function (event) {
    clickSaveButton();
    // Call the saveintovar function before submitting the form
    saveintovar();
    
    // Optionally, you can prevent the default form submission behavior
    // if you want to control the submission through AJAX or other means.
    // event.preventDefault();
});
