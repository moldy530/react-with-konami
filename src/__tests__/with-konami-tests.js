import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import withKonami from '../index';

describe('with-konami', () => {
    const handler = jest.fn();

    const defaultProps = {
        code: ['UpArrow', 'DownArrow'],
        handler
    };

    beforeEach(() => {
        handler.mockReset();
    });

    describe('without reset on success', () => {
        it('should work for class components', () => {
            doTest(ClassComponent);
        });

        it('should work for functional components', () => {
            doTest(FunctionalComponent);
        });
    });

    describe('with reset on success', () => {
        it('should work for class components', () => {
            doTest(ClassComponent, {...defaultProps, resetOnSuccess: true});
        });

        it('should work for functional components', () => {
            doTest(FunctionalComponent, {...defaultProps, resetOnSuccess: true});
        });
    });

    const doTest = (component, props = defaultProps) => {
        const Wrapped = withKonami(component);
        const wrapper = mount(
            <Wrapped {...props}>
                Hi World!
            </Wrapped>
        );
        const inputCode = () => {
            act(() => {
                const event = new KeyboardEvent('keyup', {key: 'UpArrow'});
                global.dispatchEvent(event);

                const event2 = new KeyboardEvent('keyup', {key: 'DownArrow'});
                global.dispatchEvent(event2);
            });

            wrapper.update();
        };

        // test first success
        expect(handler.mock.calls.length).toBe(0);
        inputCode();
        expect(handler.mock.calls.length).toBe(1);

        // test for the resetOnSuccess case
        wrapper.update();

        // make sure we can do it twice
        inputCode();
        expect(handler.mock.calls.length).toBe(props.resetOnSuccess ? 2 : 1);

        wrapper.unmount();
    }
});

const FunctionalComponent = (props) => {
    const {
        children,
        konamiSuccess,
        handler
    } = props;

    useEffect(() => {
        if (konamiSuccess) handler();
    }, [konamiSuccess]);

    return (<div>{konamiSuccess ? 'EASTER YAY' : children}</div>);
};

class ClassComponent extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.konamiSuccess && (this.props.konamiSuccess !== prevProps.konamiSuccess)) this.props.handler();
    }

    render() {
        const {
            children,
            konamiSuccess,
        } = this.props;

        return (<div>{konamiSuccess ? 'EASTER YAY' : children}</div>);
    }
}
