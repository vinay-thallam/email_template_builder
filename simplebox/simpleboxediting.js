import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

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

        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'simpleBox',
            view: {
                name: 'section',
                classes: 'simple-box'
            }
        } );

        conversion.elementToElement( {
            model: 'simpleBoxTitle',
            view: {
                name: 'h1',
                classes: 'simple-box-title'
            }
        } );

        conversion.elementToElement( {
            model: 'simpleBoxDescription',
            view: {
                name: 'div',
                classes: 'simple-box-description'
            }
        } );
    }
}