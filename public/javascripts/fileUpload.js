// all plugins need to be installed. all plugins can be registered using reisterPlugin method
// this method takes a list of all plugins that we need to install
const rootStyles = window.getComputedStyle(document.documentElement);

if (
	rootStyles.getPropertyValue("--book-cover-width-large") != null &&
	rootStyles.getPropertyValue("--book-cover-width-large") != ""
) {
	ready();
} else {
	document.getElementById("main-css").addEventListener("load", ready);
}

function ready() {
	const coverWidth = parseFloat(
		rootStyles.getPropertyPriority("--book-cover-width-large")
	);
	const coverAspectRatio = parseFloat(
		rootStyles.getPropertyValue("--book-cover-aspect-ratio")
	);
	const coverHeight = coverWidth / coverAspectRatio;
	FilePond.registerPlugin(
		FilePondPluginImagePreview,
		FilePondPluginImageResize,
		FilePondPluginFileEncode
	);

	FilePond.setOptions({
		stylePanelAspectRatio: 1 / coverAspectRatio,
		imageResizeTargetWidth: coverWidth,
		imageResizeTargetHeight: coverHeight,
	});

	FilePond.parse(document.body); // and this will turn all our file inputs into filepond objects
}
