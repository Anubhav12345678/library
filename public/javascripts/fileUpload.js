// all plugins need to be installed. all plugins can be registered using reisterPlugin method
// this method takes a list of all plugins that we need to install
FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginFileEncode
);

FilePond.setOptions({
	stylePanelAspectRatio: 150 / 100,
	imageResizeTargetWidth: 100,
	imageResizeTargetHeight: 150,
});

FilePond.parse(document.body); // and this will turn all our file inputs into filepond objects
