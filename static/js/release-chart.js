import {createChart} from './chart'
import {
  serverAndDesktopReleases,
  kernelReleases,
  openStackReleases,
  kubernetesReleases,
  desktopServerStatus,
  kernelStatus,
  openStackStatus,
  kubernetesStatus,
  desktopServerReleaseNames,
  kernelReleaseNames,
  openStackReleaseNames,
  kubernetesReleaseNames,
} from './chartData';


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}

function buildCharts() {
  createChart('#server-desktop-eol', desktopServerReleaseNames, desktopServerStatus, serverAndDesktopReleases);
  // createChart('#kernel-eol', kernelReleaseNames, kernelStatus, kernelReleases);
  // createChart('#openstack-eol', openStackReleaseNames, openStackStatus, openStackReleases);
  // createChart('#kubernetes-eol', kubernetesReleaseNames, kubernetesStatus, kubernetesReleases);
}

function clearCharts() {
  document.querySelector('#server-desktop-eol').innerHTML = '';
  // document.querySelector('#kernel-eol').innerHTML = '';
  // document.querySelector('#openstack-eol').innerHTML = '';
  // document.querySelector('#kubernetes-eol').innerHTML = '';
}

var mediumBreakpoint = 768;

// A bit of a hack, but chart doesn't load with full year axis on first load,
// It has to be loaded once, and then again
// This will need looking into but this fix will work for now
if (window.innerWidth >= mediumBreakpoint) {
  buildCharts();
  setTimeout(function() {
    clearCharts();
    buildCharts();
  }, 0);
}

window.addEventListener('resize', debounce(function() {
  if (window.innerWidth >= mediumBreakpoint) {
    clearCharts();
    buildCharts();
  }
}, 250));
