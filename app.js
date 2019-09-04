// app.js

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

class InsertImage extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertImage', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert image',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                const imageURL = prompt( 'Image URL' );

                editor.model.change( writer => {
                    const imageElement = writer.createElement( 'image', {
                        src: imageURL
                    } );

                    // Insert the image in the current selection location.
                    editor.model.insertContent( imageElement, editor.model.document.selection );
                } );
            } );

            return view;
        } );
    }
}

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Bold, Italic, Image, InsertImage, ImageCaption ],
        toolbar: [ 'bold', 'italic', 'insertImage' ]
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
        CKEditorInspector.attach( editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );
