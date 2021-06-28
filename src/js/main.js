(()=>{

app_config.passed=0;

//Clicks, psl_actions
const psl_actions=(()=>{
	const _list=new Map();
	function _add(uid,callback){
		if(typeof(uid)==='object'){
			for(let [i,c] of Object.entries(uid)) _add(i,c);
			return;
		}
		_list.set(uid,callback);
	}

	function _remove(uid){
		if(typeof(uid)!=='string'){
			if(uid instanceof Object){
				for(let i of Object.keys(uid)) _remove(i);
				return;
			} else if(uid instanceof Array){
				uid.forEach(_remove);
				return;
			}
		}
		_list.delete(uid);
	}

	function _handler(e){
		let el=e.target;
		while(el&&el.dataset&&!el.dataset.action) el=el.parentNode;
		if(!el) return;
		if(!el.dataset||!el.dataset.action) return;
		if(!_list.has(el.dataset.action)) return;
		e.stopPropagation();
		e.preventDefault();
		let args=el.dataset.data;
		if(args){
			args=args.split(',').map(function(el){
				try{
					return JSON.parse(el);
				} catch(e){
					return el;
				}
			});
		} else {
			args=[];
		}
		_list.get(el.dataset.action)(e,...args);
		return false;
	}

	function _fire(action, e, ...args){
		if(action instanceof HTMLElement) return action.click();
		if(!_list.has(action)) return;
		_list.get(action)(e,...args);
	}

	window.addEventListener('click',_handler);

	const _ext={
		add:_add,
		remove:_remove,
		fire:_fire,
	}
	
	return _ext;
})();

let rpoints;

window.addEventListener('load',()=>{
	
	rpoints=_rpoints(document.body);
	
	rpoints.trends_list.innerHTML=_trends.list;
	rpoints.scenarios_list.innerHTML=_scenarios.list;
	rpoints.scenarios_list.addEventListener('wheel',e=>{
		if(rpoints.scenarios_list.querySelector('.scenario.top')) return;
		rpoints.scenarios_list.scrollLeft+=e.deltaY;
	});
	
	if(app_config.scenarios.length===3){
		rpoints.scenarios_list.classList.add('three');
	}
});

const _wait=time=>new Promise(resolve=>setTimeout(()=>resolve(),time));

const _rpoints=(()=>{
	
	function _resolve_path(rpoints,rpoint,el){
		rpoint=rpoint.split('.');
		if(rpoint.length===1) return rpoints[rpoint[0]]=el;
		let target=rpoints;
		for(let i=0;i<rpoint.length-1;i++){
			if(!target[rpoint[i]]) target[rpoint[i]]={};
			target=target[rpoint[i]];
		}
		target[rpoint[rpoint.length-1]]=el;
	}
	
	function _get_rpoints(node,configs={}){
		let els=Array.from(node.querySelectorAll('[data-rpoint]'));
		let rpoints={};
		for(let el of els) _resolve_path(rpoints,el.dataset.rpoint,el);
		return rpoints;
	}
	
	return _get_rpoints;
})();

const _trends=(()=>{
	const _list=(()=>app_config.trends.map(({uid,label,img})=>(`
			<div class="trend" data-action="trend_show" data-data="${uid}">
				<h2>${label}</h2>
				<div class="img_container"><img src="${img}"/></div>
			</div>
	`)).join(''))();
	
	async function _show(uid,color='#001965',bkg='white'){
		
		const {img,label,text}=app_config.trends.find(trend=>trend.uid===uid);
		
		rpoints.trend_image.innerHTML=`<img class="full" src="${img}">`;
		
		rpoints.trend_content_container.style.backgroundColor=bkg;
		
		rpoints.trend_content.style.color=color;
		
		rpoints.trend_content.innerHTML=`
			<h2>${label}</h2>
			${text}
		`;
		
		await _transitions('trend_show');
	}
	
	function _hide(){
		_transitions('trend_hide');
	}
	
	function _render_list(list,color='#001965',bkg='white'){
		return list.map(uid=>app_config.trends.find(trend=>trend.uid===uid)).map(({uid,label,img})=>(`
			<div class="trend" data-action="trend_show" data-data="${uid},${color},${bkg}">
				<h4>${label}</h4>
				<div class="img_container"><img src="${img}"/></div>
			</div>
		`)).join('');
	}
	
	psl_actions.add({
		'trend_show':async (_,uid,color='#001965',bkg='white')=>{
			await _show(uid,color,bkg);
		}
	});
	
	const _ext={
		get list(){return _list},
		set list(v){},
		show:_show,
		hide:_hide,
		render_list:_render_list
	}
	
	return _ext;
})();

let points={};

function _shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

function reset(){
	points={};
	app_config.passed=0;
	app_config.scenarios.forEach(scenario=>scenario.chosen=false);
	
	Array.from(rpoints.scenarios_list.querySelectorAll('.scenario')).forEach(el=>el.classList.remove('chosen'));
	
	document.querySelector('#scenarios .buttons [data-action="results.show"]').classList.add('hidden_opacity');
	
	_transitions('results_hide');
}

psl_actions.add('reset',reset);

const _future_icons=(()=>{
	//Most probably this is a bad idea, but the only one which allows to easy change color.
	const _icons={
		aspiring:`<svg version="1.1" viewBox="0 0 122.08 121.48" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1.3333 0 0 -1.3333 0 121.48)"><g transform="scale(.1)" fill="#001965"><path d="m457.62 477.28c-2.953 0-5.945-0.605-8.812-1.886-5.297-2.364-9.356-6.653-11.43-12.063-2.07-5.406-1.914-11.305 0.449-16.598l4e-3 -0.011c2.359-5.293 6.641-9.348 12.055-11.426 5.422-2.059 11.32-1.902 16.605 0.449 5.301 2.363 9.359 6.653 11.434 12.063 2.074 5.418 1.914 11.308-0.45 16.609-3.597 8.059-11.542 12.863-19.855 12.863zm0.117-83.41c-23.621-8e-3 -46.207 13.633-56.437 36.563-6.715 15.05-7.168 31.816-1.278 47.207 5.899 15.39 17.434 27.566 32.489 34.277 31.086 13.859 67.629-0.137 81.496-31.211 6.715-15.051 7.168-31.816 1.269-47.207-5.89-15.391-17.429-27.566-32.484-34.277-8.145-3.633-16.664-5.352-25.055-5.352"/><path d="m438.34 254.15h36.215v66.981l15.214 3.75c7.883 1.953 15.528 4.562 22.727 7.773 13.141 5.852 25.215 13.758 35.895 23.496l11.433 10.43 55.481-36.16 19.777 30.34-55.363 36.086 5.105 14.754c9.883 28.574 9.973 58.742 0.254 87.226l-5.043 14.793 55.547 35.793-19.609 30.449-55.661-35.847-11.375 10.488c-16.621 15.32-37.082 26.285-59.168 31.726l-15.214 3.75v67.004h-36.215v-67.316l-14.887-3.934c-7.125-1.886-14.074-4.328-20.648-7.257-13.504-6.016-25.871-14.2-36.75-24.297l-11.446-10.625-57.019 37.16-19.778-30.344 57.204-37.285-4.938-14.68c-9.359-27.847-9.449-57.246-0.25-85.008l4.879-14.707-57.398-36.972 19.609-30.449 57.195 36.843 11.391-10.679c16.226-15.239 36.258-26.301 57.933-32.012l14.903-3.93zm47.027-40h-57.836c-16.094 0-29.191 13.094-29.191 29.188v48.058c-17.367 6.278-33.672 15.274-48.188 26.582l-40.656-26.195c-6.543-4.226-14.355-5.652-21.977-3.992-7.621 1.652-14.144 6.16-18.367 12.727l-31.324 48.621c-4.219 6.554-5.637 14.367-3.988 21.98 1.648 7.629 6.176 14.152 12.738 18.383l41.012 26.414c-6.227 26.445-6.149 53.691 0.238 80.176l-40.91 26.66c-13.484 8.801-17.305 26.914-8.52 40.398l31.582 48.45c4.254 6.535 10.797 11.015 18.426 12.628 7.645 1.61 15.442 0.157 21.969-4.113l40.519-26.394c10.981 8.484 22.911 15.625 35.625 21.289 3.856 1.718 7.801 3.308 11.821 4.754v48.027c0 16.094 13.097 29.191 29.191 29.191h57.836c16.094 0 29.188-13.097 29.188-29.191v-47.207c17.824-6.152 34.578-15.145 49.492-26.582l39.347 25.344c6.543 4.226 14.336 5.652 21.977 3.992 7.621-1.649 14.145-6.16 18.371-12.727l31.32-48.621c4.219-6.551 5.637-14.363 3.993-21.98-1.653-7.629-6.18-14.153-12.743-18.379l-38.964-25.102c6.531-27.117 6.445-55.672-0.239-82.832l38.867-25.332c13.473-8.777 17.297-26.89 8.532-40.371l-31.598-48.465c-4.238-6.523-10.785-11.015-18.418-12.629-7.617-1.629-15.433-0.164-21.973 4.114l-39.214 25.547c-10.676-8.118-22.239-14.969-34.52-20.442-4.621-2.058-9.375-3.933-14.23-5.594v-47.187c0-16.094-13.094-29.188-29.188-29.188"/><path d="m460.05 0c-246.64 0-450.97 200.55-455.49 447.05-0.20312 11.047 8.5859 20.168 19.629 20.371 11.004 0.441 20.164-8.582 20.363-19.629 4.1211-224.86 190.51-407.79 415.5-407.79 128.14 0 247.17 57.793 326.58 158.56 6.832 8.652 19.422 10.175 28.086 3.32 8.68-6.836 10.168-19.402 3.332-28.086-87.047-110.45-217.54-173.79-358-173.79"/><path d="m874.44 301.01c-2.047 0-4.125 0.32-6.176 0.984-10.508 3.41-16.262 14.688-12.852 25.196 13.406 41.32 20.203 84.511 20.203 128.38 0 229.14-186.42 415.57-415.57 415.57-171.88 0-328.15-107.99-388.88-268.71-3.9024-10.332-15.426-15.559-25.781-11.641-10.332 3.907-15.543 15.449-11.641 25.782 66.57 176.19 237.89 294.57 426.3 294.57 251.2 0 455.57-204.36 455.57-455.57 0-48.066-7.453-95.41-22.156-140.72-2.746-8.457-10.586-13.836-19.019-13.836"/><path d="m806.27 26.223c-11.043 0-20 8.9531-20 20v124.66h-124.65c-11.047 0-20 8.957-20 20 0 11.047 8.953 20 20 20h164.65v-164.66c0-11.047-8.953-20-20-20"/><path d="m32.84 582.53-32.445 161.42c-2.1719 10.832 4.8398 21.375 15.668 23.555 10.812 2.18 21.375-4.844 23.551-15.664l24.566-122.22 125.82 25.293c10.812 2.16 21.371-4.84 23.551-15.664 2.172-10.828-4.84-21.375-15.668-23.551l-165.05-33.168"/></g></g></svg>`,
		imaginitive:`<svg version="1.1" viewBox="0 0 70.733 126.48" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1.3333 0 0 -1.3333 0 126.48)"><g transform="scale(.1)" fill="#001965"><path d="m167.31 495.66c-15.586 0-28.262-12.676-28.262-28.254 0-15.586 12.676-28.258 28.262-28.258h31.273v28.258c0 15.578-12.676 28.254-28.262 28.254zm167.66-56.512h28.258c15.586 0 28.261 12.672 28.261 28.258 0 15.578-12.675 28.254-28.261 28.254-15.582 0-28.258-12.676-28.258-28.254zm-20-259.48c-11.043 0-20 8.953-20 20v199.48h-56.387v-199.48c0-11.047-8.953-20-20-20-11.043 0-20 8.953-20 20v199.48h-31.273c-37.641 0-68.262 30.625-68.262 68.258 0 37.641 30.621 68.254 68.262 68.254h3.011c37.641 0 68.262-30.613 68.262-68.254v-28.258h56.387v28.258c0 37.641 30.621 68.254 68.258 68.254 37.64 0 68.261-30.613 68.261-68.254 0-37.633-30.621-68.258-68.261-68.258h-28.258v-199.48c0-11.047-8.953-20-20-20"/><path d="m262.44 716.86h0.098zm0.227-20c-60.164-0.683-116.46-24.765-158.52-67.8-42.05-43.039-64.828-99.875-64.132-160.03 0.6485-56.718 22.434-110.66 61.336-151.88 32.93-34.914 51.067-82.032 51.067-132.69v-55.129c0-2.066 1.683-3.75 3.75-3.75h210.22c2.066 0 3.75 1.684 3.75 3.75v45.18c0 52.598 20.222 103.25 55.484 138.97 42.543 43.117 65.59 100.21 64.891 160.72-0.688 60.176-24.77 116.46-67.809 158.52-43.031 42.062-99.746 64.914-160.04 64.14zm103.72-611.28h-210.22c-24.129 0-43.75 19.629-43.75 43.75v55.129c0 40.41-14.266 77.774-40.164 105.24-45.812 48.554-71.469 112.07-72.238 178.86-0.81641 70.859 26.004 137.78 75.527 188.46 49.523 50.684 115.81 79.043 186.66 79.851 70.684 0.344 137.78-26.003 188.46-75.527 50.672-49.519 79.031-115.81 79.848-186.66 0.82-71.289-26.317-138.51-76.422-189.28-27.934-28.313-43.953-68.723-43.953-110.88v-45.18c0-24.121-19.625-43.75-43.75-43.75"/><path d="m318.15 0h-110.96c-20.312 0-36.836 16.523-36.836 36.824v68.75c0 11.047 8.957 20 20 20 11.047 0 20-8.953 20-20v-65.574h104.63v65.574c0 11.047 8.957 20 20 20 11.047 0 20-8.953 20-20v-68.75c0-20.301-16.523-36.824-36.836-36.824"/><path d="m391.83 179.67h-260.04c-11.043 0-20 8.953-20 20s8.957 20 20 20h260.04c11.047 0 20-8.953 20-20s-8.953-20-20-20"/><path d="m265.27 803.75c-11.043 0-20 8.953-20 20v104.84c0 11.047 8.957 20 20 20 11.047 0 20-8.953 20-20v-104.84c0-11.047-8.953-20-20-20"/><path d="m104.37 760.86c-5.117 0-10.234 1.954-14.14 5.86l-74.133 74.133c-7.8126 7.812-7.8126 20.468 0 28.281 7.8007 7.812 20.469 7.812 28.281 0l74.133-74.133c7.812-7.812 7.812-20.469 0-28.281-3.899-3.906-9.024-5.86-14.141-5.86"/><path d="m426.3 760.86c-5.117 0-10.238 1.954-14.141 5.86-7.812 7.812-7.812 20.469 0 28.281l74.133 74.133c7.801 7.812 20.477 7.812 28.281 0 7.813-7.813 7.813-20.469 0-28.281l-74.132-74.133c-3.903-3.906-9.024-5.86-14.141-5.86"/></g></g></svg>`,
		pragmatic:`<svg version="1.1" viewBox="0 0 122.79 88.853"xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1.3333 0 0 -1.3333 0 88.853)"><g transform="scale(.1)" fill="#001965"><path d="m754.81 132.34c-15.766 0-31.489 5.934-43.723 17.715l-161 154.89c-7.961 7.657-8.203 20.321-0.547 28.282 7.664 7.968 20.32 8.183 28.281 0.547l161.01-154.9c8.602-8.281 21.922-8.664 30.996-0.906 5 4.273 7.86 10.262 8.055 16.844s-2.309 12.715-7.039 17.285l-276.77 266.94-91.007-49.121c-47.813-25.801-106.8-9.324-134.3 37.559-6.61 11.269-8.344 24.414-4.887 37.011 3.457 12.598 11.66 23.008 23.09 29.329l197 108.89c73.094 40.41 163.34 26.055 220.29-33.308l124.83 52.039c10.195 4.277 21.91-0.555 26.156-10.762 4.25-10.195-0.57-21.902-10.766-26.152l-151.82-63.29-9.422 11.59c-43.668 53.692-119.33 68.352-179.92 34.883l-197.01-108.9c-2.583-1.426-3.532-3.684-3.864-4.906-0.336-1.219-0.672-3.653 0.817-6.192 16.539-28.199 52.039-38.125 80.789-22.598l116.74 63.008 297.81-287.23c12.765-12.305 19.785-29.531 19.257-47.266-0.527-17.726-8.554-34.511-22.027-46.047-11.902-10.183-26.484-15.23-41.023-15.23"/><path d="m732.48 268.59c-6.582 0-13.027 3.242-16.847 9.187-5.969 9.297-3.274 21.672 6.015 27.641l168.41 108.18c9.285 5.968 21.671 3.281 27.636-6.012 5.969-9.297 3.274-21.672-6.015-27.641l-168.41-108.18c-3.343-2.149-7.089-3.172-10.789-3.172"/><path d="m184.59 564.49-130.25 63.946c-9.918 4.863-14.008 16.843-9.1407 26.765 4.8672 9.895 16.859 14.004 26.77 9.133l109.46-53.731 31.148 20.997c69.559 46.902 161.78 40.535 224.26-15.469l10.219-9.16c8.222-7.375 8.918-20.02 1.543-28.243-7.372-8.234-20.016-8.937-28.243-1.542l-10.218 9.16c-48.809 43.75-120.86 48.718-175.2 12.09l-50.347-33.946"/><path d="m155.67 299.76c-3.344 0-6.734 0.836-9.852 2.605l-135.69 77.02c-9.6016 5.453-12.973 17.66-7.5195 27.265 5.4492 9.602 17.656 12.969 27.266 7.524l135.69-77.024c9.602-5.449 12.973-17.656 7.52-27.265-3.684-6.485-10.449-10.125-17.414-10.125"/><path d="m661.84 87.078c-17.844 0-35.641 6.8164-49.148 20.324l-111.47 111.46c-7.813 7.813-7.813 20.469 0 28.281 7.801 7.813 20.469 7.813 28.281 0l111.47-111.46c11.023-11.028 28.781-11.551 40.437-1.192 6.215 5.528 9.731 13.145 9.895 21.465 0.168 8.32-3.047 16.074-9.047 21.844l-20.438 19.64c-7.964 7.657-8.218 20.321-0.562 28.282 7.644 7.957 20.309 8.211 28.277 0.566l20.442-19.648c13.933-13.399 21.707-32.161 21.32-51.473-0.383-19.32-8.883-37.758-23.324-50.578-13.176-11.707-29.676-17.512-46.133-17.512"/><path d="m566.56 45.793c-17.84-0.0117-35.645 6.8125-49.149 20.32l-73.801 73.797c-7.812 7.813-7.812 20.473 0 28.281 7.805 7.817 20.481 7.817 28.282 0l73.801-73.796c11.019-11.027 28.789-11.551 40.433-1.1914 6.223 5.5274 9.738 13.145 9.899 21.465 0.164 8.32-3.047 16.074-9.043 21.844l-20.442 19.64c-7.961 7.657-8.215 20.321-0.558 28.282 7.644 7.957 20.304 8.211 28.273 0.566l20.445-19.648c13.93-13.399 21.7-32.161 21.321-51.473-0.383-19.32-8.883-37.746-23.328-50.578-13.172-11.707-29.668-17.508-46.133-17.508"/><path d="m207.43 326.54-41.735-24.102c-12.23-7.07-16.433-22.773-9.371-35.011 3.418-5.926 8.946-10.164 15.559-11.934 6.598-1.766 13.5-0.848 19.437 2.559l41.739 24.101c5.968 3.449 10.218 9.016 11.968 15.688 1.754 6.668 0.782 13.609-2.726 19.547-7.109 12.035-22.742 16.144-34.871 9.14zm-28.813-111.94c-5.699 0-11.433 0.746-17.086 2.257-16.929 4.54-31.078 15.391-39.847 30.575-18.094 31.347-7.321 71.554 24.011 89.648l41.735 24.102c31.015 17.89 71.082 7.394 89.304-23.438 8.985-15.203 11.465-32.976 6.985-50.058-4.485-17.071-15.367-31.336-30.656-40.164l-41.739-24.102c-10.105-5.84-21.332-8.82-32.707-8.82"/><path d="m423.52 129.44h0.097zm23.117-13.679c-4.418 0-8.891-1.145-12.949-3.535l-41.493-24.504c-12.168-7.1875-16.222-22.926-9.035-35.106 7.184-12.168 22.938-16.211 35.094-9.0234l41.496 24.5c5.938 3.5078 10.129 9.125 11.817 15.812 1.683 6.6796 0.648 13.613-2.918 19.5-4.797 7.942-13.309 12.356-22.012 12.356zm-41.305-115.76c-5.484 0-11.012 0.69141-16.469 2.0977-16.976 4.3672-31.234 15.09-40.144 30.188-18.399 31.16-8.024 71.485 23.133 89.883l41.496 24.492c30.824 18.231 70.996 8.106 89.531-22.551 9.137-15.105 11.785-32.859 7.477-49.976-4.313-17.121-15.063-31.496-30.262-40.48l-41.496-24.504c-10.246-6.0547-21.676-9.1484-33.266-9.1484"/><path d="m311.89 273.15-105.48-60.906c-5.929-3.418-10.168-8.945-11.941-15.558-1.766-6.61-0.86-13.512 2.566-19.442 7.059-12.238 22.762-16.426 35.004-9.375l105.48 60.906c5.988 3.469 10.246 9.055 11.984 15.754 1.742 6.699 0.742 13.66-2.816 19.602-7.137 11.93-22.754 16.004-34.801 9.019zm-92.551-148.7c-22.703 0-44.801 11.766-56.945 32.793-8.766 15.176-11.098 32.859-6.563 49.797 4.535 16.93 15.395 31.082 30.578 39.852l105.48 60.906c30.847 17.785 70.836 7.441 89.121-23.125 9.109-15.211 11.672-33.043 7.215-50.196-4.453-17.156-15.36-31.484-30.711-40.339l-105.48-60.911c-10.308-5.957-21.578-8.777-32.699-8.777"/><path d="m381.33 189.84-105.48-60.918c-5.93-3.43-10.168-8.957-11.938-15.57-1.769-6.61-0.859-13.512 2.563-19.442 7.058-12.219 22.75-16.418 35.004-9.3633l105.48 60.906c5.992 3.457 10.246 9.055 11.988 15.762 1.739 6.687 0.735 13.641-2.812 19.582-7.16 11.93-22.766 15.984-34.805 9.043zm-92.566-148.72c-22.696 0-44.793 11.77-56.934 32.793-8.762 15.188-11.098 32.871-6.562 49.793 4.539 16.934 15.394 31.086 30.578 39.856l105.48 60.91c30.836 17.808 70.828 7.437 89.125-23.125 9.098-15.199 11.66-33.02 7.211-50.168-4.449-17.168-15.351-31.496-30.703-40.363l-105.49-60.918c-10.309-5.9453-21.582-8.7773-32.711-8.7773"/></g></g></svg>`
	};
	 return (type,color)=>_icons[type].replace(/#001965/g,color);
})();

const _scrollable=(()=>{
	window.addEventListener('load',()=>{
		Array.from(document.querySelectorAll('.scrollable')).forEach(el=>{
			const div=document.createElement('div');
			div.className='scrollable_notice_container animation_250';
			div.innerHTML='<div class="scrollable_notice">Scroll down&nbsp;<i class="icon icon_scroll_down"></i></div>';
			el.parentNode.appendChild(div);
			el.addEventListener('scroll',()=>{
				div.classList.add('hidden');
			});
		});
	});
})();

const _results=(()=>{
	
	async function _show(){
		let result={t:'',p:-1};
		for(let t in points) if(points[t]>result.p) result={t,p:points[t]}
		result=app_config.results[result.t];
		if(!result) return;
		
		rpoints.results_content.innerHTML=`
			<h2>Your Result</h2>
			<h2>${result.label}</h2>
			<p>${result.text}</p>
		`;
		rpoints.results_image.innerHTML=`<img class="full" src="${result.img}">`;
		
		await _transitions('results_show');
	}
	
	psl_actions.add({
		'results.show':_show
	});
	
})();

const _scenarios=(()=>{
	
	if(app_config.random_scenarios) _shuffle(app_config.scenarios);
	
	const _list=(()=>app_config.scenarios.map(({img,label,color,bkg},i)=>(`
		<div id="scenario_${i}" class="scenario scenario_index">
			<img src="${img}"/>
			<div class="content" style="background-color:${bkg}; color: ${color};">
				<div class="content_container scrollable full">
					<a href="#" class="btn btn_round btn_blue btn_top" data-action="scenario.show" data-data="${i}"><i class="icon icon_arrow_right"></i><span>&nbsp;&nbsp;Back</span></a>
					<h2>${label}</h2>
					<div class="actual_content"></div>
				</div>
			</div>
		</div>
	`)).join(''))();
	
	psl_actions.add({
		'scenario.show':async (_,i)=>{
			i=+i;
			_show(i);
		},
		'scenario.choice':async (_,scenario,choice)=>{
			choice=+choice;
			const view=rpoints.scenarios_list.querySelector(`#scenario_`+scenario);
			scenario=app_config.scenarios[+scenario];
			Array.from(view.querySelectorAll('.choice')).forEach((el,i)=>{
				const a=el.querySelector('a');
				if(i===choice){
					a.style.backgroundColor='#001965';
					a.innerHTML='Send Answer';
					a.dataset.action='scenario.confirm_choice';
				} else {
					a.style.backgroundColor=scenario.bkg;
					a.innerHTML='Choose&nbsp;&nbsp;<i class="icon icon_check"></i>';
					a.dataset.action='scenario.choice';
				}
			});
		},
		'scenario.confirm_choice':async (_,scenario,choice)=>{
			scenario=+scenario;
			choice=+choice;
			app_config.passed++;
			app_config.scenarios[scenario].chosen=true;
			choice=app_config.scenarios[scenario].choices[choice];
			const weights=choice.weights;
			for(let i in weights){
				if(!points[i]) points[i]=0;
				points[i]+=weights[i];
			}
			const view=rpoints.scenarios_list.querySelector(`#scenario_`+scenario);
			view.querySelector('.dynamic_content').innerHTML+=`
				<div class="response height_0 hidden_opacity">
					<div class="choice">You selected: ${choice.text}</div>
					<h3 class="with_icon">${_future_icons(choice.icon,app_config.scenarios[scenario].color)}<span>You chose ${choice.type} future scenario</span></h3>
					<p>${choice.asnwer}</p>
					<p>${choice.response}</p>
					<div class="buttons">
						<a href="#" class="btn btn_blue small${app_config.passed===app_config.scenarios.length?' hidden_opacity':''}" data-action="transition" data-data="scenario_close,${scenario}">Next Scenario&nbsp;&nbsp;<i class="icon icon_arrow_right_small"></i></a>
						${app_config.passed>2?'<a href="#" class="btn btn_blue small" data-action="results.show">See My Results&nbsp;&nbsp;<i class="icon icon_document"></i></a>':`<span>Choose ${3-app_config.passed} more scenario${(3-app_config.passed)===1?'':'s'}</span>`}
					</div>
				</div>
			`;
			
			if(app_config.passed>2) document.querySelector('#scenarios .buttons [data-action="results.show"]').classList.remove('hidden_opacity');
			
			await _wait(50);
			
			_transitions('scenario_answered',[view]);
		}
	});
	
	function _show(i){
		const view=rpoints.scenarios_list.querySelector(`#scenario_`+i);
		const content=view.querySelector('.actual_content');
		const scenario=app_config.scenarios[i];
		
		if(app_config.random_choices) _shuffle(scenario.choices);
		
		content.innerHTML=`
			${scenario.text}
			${scenario.trends&&scenario.trends.length?`
				<h3>Trends in this scenario</h3>
				<div class="trends_list">
					${_trends.render_list(scenario.trends,scenario.color,scenario.bkg)}
				</div>
				`:``}
			<h3>${scenario.question}</h3>
			<div class="dynamic_content">
				<div class="choices">
					<p>Choose an answer that best reflects your thoughts about the future.</p>
					${scenario.choices.map((choice,n)=>(`
						<div class="choice">
							${choice.text}<br/>
							<a href="#" class="btn btn-inherit small" style="background-color:${scenario.bkg}" data-action="scenario.choice" data-data="${i},${n}">Choose&nbsp;&nbsp;<i class="icon icon_check"></i></a>
						</div>
					`)).join('')}
				</div>
			</div>
		`;
		
		_transitions('scenario_open',[i]);
	}
	
	function _hide(){
		
	}
	
	const _ext={
		get list(){return _list},
		set list(v){},
		show:_show,
		hide:_hide,
	}
	
	return _ext;
})();

const _scroll_to=(()=>{
	
	return (el,y)=>new Promise((resolve,reject)=>{
		const func=()=>{
			el.scrollTop+=(y-el.scrollTop)/6;
			if(Math.abs(el.scrollTop-y)<1){
				el.scrollTop=y;
				resolve();
			} else {
				setTimeout(func,16);
			}
		}
		func();
	});
	
})();

const _transitions=(()=>{
	
	let _cur_scenario=undefined;
	
	const _list={
		index_to_trends:async ()=>{
			rpoints.index_text.classList.add('hidden_top');
			rpoints.trends_text.classList.remove('hidden_bottom');
			
			for(let i=0;i<3;i++)
				(async ()=>{
					await _wait(75*i);
					rpoints.scenarios_list.querySelector('#scenario_'+i).classList.add('hidden_top');
				})(i);
			
			await _wait(150);
			rpoints.trends_list_container.classList.remove('hidden_bottom');
			
			await _wait(250+500+150);
			rpoints.scenarios_list.classList.add('hidden_top');
		},
		trends_to_index:async ()=>{
			rpoints.index_text.classList.remove('hidden_top');
			rpoints.scenarios_list.classList.remove('hidden_top');
			
			rpoints.trends_text.classList.add('hidden_bottom');
			rpoints.trends_list_container.classList.add('hidden_bottom');
			
			for(let i=0;i<3;i++)
				(async ()=>{
					await _wait(75*i);
					rpoints.scenarios_list.querySelector('#scenario_'+i).classList.remove('hidden_top');
				})(i);
		},
		trend_show:async ()=>{
			rpoints.trend_container.classList.remove('hidden_left');
			rpoints.trend_image.classList.remove('hidden_left');
		},
		trend_hide:async ()=>{
			rpoints.trend_container.classList.add('hidden_left');
			rpoints.trend_image.classList.add('hidden_left');
			
			await _wait(500);
			
			rpoints.trend_content_container.style.backgroundColor='';
			rpoints.trend_content.style.color='';
		},
		
		index_to_scenarios:async ()=>{
			
			if(app_config.passed===app_config.scenarios.length){
				points={};
				app_config.passed=0;
				app_config.scenarios.forEach(scenario=>scenario.chosen=false);
				
				Array.from(rpoints.scenarios_list.querySelectorAll('.scenario')).forEach(el=>el.classList.remove('chosen'));
				
				document.querySelector('#scenarios .buttons [data-action="results.show"]').classList.add('hidden_opacity');
			}
			
			rpoints.scenarios_container.className='full';
			rpoints.index_text.classList.add('hidden_left');
			await _wait(500);
			for(let i=0;i<app_config.scenarios.length;i++)
				(async (i)=>{
					await _wait(75+75*i);
					rpoints.scenarios_list.querySelector('#scenario_'+i).classList.remove('scenario_index');
					rpoints.scenarios_list.querySelector('#scenario_'+i).classList.add('scenario_tiny');
					
				})(i);
		},
		
		scenarios_to_index:async ()=>{
			for(let i=0;i<app_config.scenarios.length;i++)
				(async (i)=>{
					await _wait(75*i);
					rpoints.scenarios_list.querySelector('#scenario_'+i).classList.add('scenario_index');
					rpoints.scenarios_list.querySelector('#scenario_'+i).classList.remove('scenario_tiny');
				})(i);
			
			await _wait(500+150);
			
			rpoints.scenarios_container.className='right_full';
			rpoints.index_text.classList.remove('hidden_left');
		},
		
		scenario_open:async n=>{
			
			rpoints.scenarios_container.classList.add('scenario_opened');
			
			n=+n;
			
			_cur_scenario=n;
			const scenario=rpoints.scenarios_list.querySelector('#scenario_'+n);
			const content=scenario.querySelector('.content');
			const img=scenario.querySelector('img');
			
			scenario.classList.add('animation_0_all');
			scenario.classList.add('top');
			
			scenario.querySelector('.scrollable_notice_container').classList.add('hidden_opacity');
			
			await _wait(1);
			
			const geom={
				width:scenario.clientWidth,
				left:scenario.offsetLeft,
				scroll_left:scenario.parentNode.scrollLeft
			};
			
			if(scenario.previousElementSibling){
				scenario.previousElementSibling.style.marginRight=app_config.scenarios.length>3?'30%':'33.33%';
			} else {
				scenario.nextElementSibling.style.marginLeft=app_config.scenarios.length>3?'30%':'33.33%';
			}
			
			scenario.classList.add('full');
			scenario.style.left=geom.scroll_left+'px';
			
			content.style.width=geom.width+'px';
			content.style.left=(geom.left-geom.scroll_left)+'px';
			img.style.width=geom.width+'px';
			img.style.left=(geom.left-geom.scroll_left)+'px';
			
			await _wait(50);
			
			scenario.classList.remove('animation_0_all');
			
			await _wait(1);
			
			content.classList.add('shown');

			await _wait(500);

			img.classList.add('right_full');
			img.classList.add('right_full_plus');
			
			scenario.querySelector('i').className='icon icon_arrow_left';
			
			scenario.querySelector('a').dataset.action='transition';
			scenario.querySelector('a').dataset.data=`scenario_close,${n}`;
			scenario.querySelector('a span').classList.add('shown');
			
			content.classList.add('left_full');
			
			await _wait(500);
			
			scenario.querySelector('.actual_content').classList.add('shown');
			scenario.querySelector('.scrollable_notice_container').classList.remove('hidden_opacity');
			scenario.classList.add('ready');
		},
		scenario_close:async n=>{
			n=+n;
			const scenario=rpoints.scenarios_list.querySelector('#scenario_'+n);
			const content=scenario.querySelector('.content');
			const img=scenario.querySelector('img');
			
			await _scroll_to(scenario.querySelector('.content_container'),0);
			
			scenario.querySelector('.actual_content').classList.remove('shown');
			scenario.querySelector('.scrollable_notice_container').classList.add('hidden_opacity');
			scenario.classList.remove('ready');
			
			await _wait(500);
			
			content.classList.remove('left_full');
			
			scenario.querySelector('i').className='icon icon_arrow_right';
			scenario.querySelector('a span').classList.remove('shown');
			
			scenario.querySelector('a').dataset.action='scenario.show';
			scenario.querySelector('a').dataset.data=`${n}`;

			img.classList.remove('right_full');
			img.classList.remove('right_full_plus');
			
			await _wait(500);
			
			content.classList.remove('shown');
			
			await _wait(500);
			
			scenario.classList.add('animation_0_all');
			rpoints.scenarios_container.classList.remove('scenario_opened');
			
			await _wait(50);
			
			scenario.classList.remove('full');
			scenario.style.left='';
			content.style.width='';
			content.style.left='';
			img.style.width='';
			img.style.left='';
			
			if(scenario.previousElementSibling) scenario.previousElementSibling.style.marginRight='';
			if(scenario.nextElementSibling) scenario.nextElementSibling.style.marginLeft='';
			
			await _wait(50);
			
			scenario.classList.remove('animation_0_all');
			scenario.classList.remove('top');
			
			await _wait(50);
			
			if(app_config.scenarios[n].chosen) scenario.classList.add('chosen');
			
			_cur_scenario=undefined;
		},
		scenario_answered:async scenario=>{
			const choices=scenario.querySelector('.choices');
			const response=scenario.querySelector('.response');
			const content_container=scenario.querySelector('.content_container');
			
			const choices_height=choices.clientHeight;
			scenario.querySelector('.choices').classList.add('hidden_opacity');
			
			await _wait(500);
			
			scenario.querySelector('.response').classList.remove('height_0');
			
// 			try{
// 				const response_height=response.clientHeight;
// 				if(choices_height>response_height) await _scroll_to(content_container,content_container.scrollTop+response_height-choices_height);
// 			} catch(e){
// 				console.error(e);
// 			}

			scenario.querySelector('.choices').classList.add('height_0');
			
			await _wait(50);
			
			scenario.querySelector('.response').classList.remove('hidden_opacity');
		},
		
		results_show:async ()=>{
			if(rpoints.results_content_flex.clientHeight<=rpoints.results_content_flex.parentNode.clientHeight){
				rpoints.results_content_container.querySelector('.scrollable_notice_container').style.display='none';
			}
			rpoints.results_container.classList.remove('hidden_left');
			rpoints.results_image.classList.remove('hidden_left');
			
			if(_cur_scenario!==undefined){
				await _wait(500);
				_run('scenario_close',[_cur_scenario]);
			}
		},
		results_hide:async ()=>{
			rpoints.results_container.classList.add('hidden_left');
			rpoints.results_image.classList.add('hidden_left');
		},
		
		share_show:async ()=>{
			rpoints.share_container.classList.remove('hidden_opacity');
			rpoints.share_content.classList.remove('hidden_right');
		},
		share_hide:async ()=>{
			rpoints.share_container.classList.add('hidden_opacity');
			rpoints.share_content.classList.add('hidden_right');
		},
		
		contact_us_show:async ()=>{
			rpoints.contact_us_container.classList.remove('hidden_opacity');
			rpoints.contact_us_content.classList.remove('hidden_right');
		},
		contact_us_hide:async ()=>{
			rpoints.contact_us_container.classList.add('hidden_opacity');
			rpoints.contact_us_content.classList.add('hidden_right');
		},
		
		popup_hide:async ()=>{
			rpoints.popup.classList.add('hidden_opacity');
		}
	}
	
	psl_actions.add('transition',async (_,name,...args)=>{
		await _run(name,args);
	});
	
	const _run=async (name,args=[])=>{
		if(_list[name]) await _list[name](...args);
	}
	
	return _run;
})();

})();
