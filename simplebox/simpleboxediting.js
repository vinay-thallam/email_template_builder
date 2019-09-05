import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

export default class SimpleBoxEditing extends Plugin {
    init() {
        console.log( 'SimpleBoxEditing#init() got called' );
        this._defineSchema();       
        this._defineConverters();
    }

    _defineSchema() {             

        // Code in this funcition is to define the schema for the markup below,
        // <simpleBox>
        //     <simpleBoxTitle></simpleBoxTitle>
        //     <simpleBoxDescription></simpleBoxDescription>
        // </simpleBox>

        const schema = this.editor.model.schema;

        schema.register( 'simpleBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'simpleBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'simpleBox',
            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
        } );

        schema.register( 'simpleBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'simpleBox',
            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );
    }

    _defineConverters() {

        // Actual structure we want to achieve in the DOM is as below. This function defines the converters to do the same.
        // <section class="simple-box">
        //     <h1 class="simple-box-title"></h1>
        //     <div class="simple-box-description"></div>
        // </section>


        //These converters are too verbose and long. Check this ticket for improvement. https://github.com/ckeditor/ckeditor5/issues/1228

        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleBox',
            view: ( modelElement, viewWriter ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'simple-box' } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        // <simpleBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleBoxTitle',
            view: {
                name: 'h1',
                classes: 'simple-box-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleBoxTitle',
            view: {
                name: 'h1',
                classes: 'simple-box-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleBoxTitle',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement( 'h1', { class: 'simple-box-title' } );

                return toWidgetEditable( h1, viewWriter );
            }
        } );

        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleBoxDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleBoxDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleBoxDescription',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'simple-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );        
    }
}