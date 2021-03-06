import { assert } from 'chai';
import { check } from "./testUtils";

describe('parser', () => {
    
    const children = { type: 'ReactNode', required: false, description: '', };

    it('should parse simple react class component', function() {
        check('Column', {
            Column: {
                children,
                prop1: { type: 'string', required: false },
                prop2: { type: 'number' },
                prop3: { type: '() => void'},
                prop4: { type: '"option1" | "option2" | "option3"' },
            }
        });
    });

    it('should parse simple react class component with state', () => {
        check('AppMenu', {
            AppMenu: {
                children,
                menu: { type: 'any' },
            }
        });
    });

    it('should parse HOCs', function() {
        check('ColumnHigherOrderComponent', {
            ColumnHigherOrderComponent1: {
                children,
                prop1: { type: 'string' },
            },
            ColumnHigherOrderComponent2: {
                children,
                prop1: { type: 'string' },
            },
            RowHigherOrderComponent1: {
                prop1: { type: 'string' },
            },
            RowHigherOrderComponent2: {
                prop1: { type: 'string' },
            },
            // TODO: these are for some reason missing
            // ColumnExternalHigherOrderComponent: {
            //     children,
            //     prop1: { type: 'string' },
            // },
            // RowExternalHigherOrderComponent: {
            //     children,
            //     prop1: { type: 'string' },
            // }
        });
    });

    it('should parse component with inherited properties HtmlAttributes<any>', function(){
        check('ColumnWithHtmlAttributes', {
            Column: {
                children,
                prop1: { type: 'string', required: false },
                prop2: { type: 'number' },
                // HtmlAttributes
                defaultChecked: { 
                    type: 'boolean', 
                    required: false, 
                    description: '' 
                }
                // ...
            }
        }, false);
    });

    it('should parse component without exported props interface', function(){
        check('ColumnWithoutExportedProps', {
            Column: {
                children,
                prop1: { type: 'string', required: false },
                prop2: { type: 'number' },
            }
        });
    });

    it('should parse functional component exported as const', function(){
        check('ConstExport', {
            Row: {
                prop1: { type: 'string', required: false },
                prop2: { type: 'number' },
            },
            // TODO: this wasn't there before, i would guess that that's correct
            test: {                
            }
        }, false);
    });

    it('should parse react component with properties defined in external file', function(){
        check('ExternalPropsComponent', {
            ExternalPropsComponent: {
                children,
                prop1: { type: 'string' },
            }
        });
    });

    it('should parse react component with properties extended from an external .tsx file', function(){
        check('ExtendsExternalPropsComponent', {
            ExtendsExternalPropsComponent: {
                children,
                prop1: { type: 'number', required: false, description: 'prop1' },
                prop2: { type: 'string', required: false, description: 'prop2' },
            }
        });
    });

    it('should parse react component with properties defined as type', function(){
        check('FlippableImage', {
            FlippableImage: {
                children,
                isFlippedX: { type: 'boolean', required: false },
                isFlippedY: { type: 'boolean', required: false },
            }
        }, false);
    });

    it('should parse react component with const definitions', function(){
        check('InlineConst', {
            MyComponent: {
                children,
                foo: { type: 'any' },
            }
        });
    });

    it('should parse react PureComponent', function(){
        check('PureRow', {
            Row: {
                children,
                prop1: { type: 'string', required: false },
                prop2: { type: 'number' },
            }
        });
    });

    it('should parse react PureComponent - regression test', function(){
        check('Regression_v0_0_12', {
            Zoomable: {
                children,
                originX: { type: 'number' },
                originY: { type: 'number' },
                scaleFactor: { type: 'number' }
            }
        }, false);
    });

    it('should parse react functional component', function(){
        check('Row', {
            Row: {
                prop1: { type: 'string', required: false },
                prop2: { type: 'number' },
            }
        });
    });

    it('should parse react stateless component', function(){
        check('Stateless', {
            Stateless: {
                children,
                myProp: { type: 'string' },
            }
        });
    });    
});