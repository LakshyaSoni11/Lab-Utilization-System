declare module 'react-typed' {
    import React from 'react';

    interface TypedProps {
        strings: string[];
        typeSpeed?: number;
        backSpeed?: number;
        loop?: boolean;
        showCursor?: boolean;
        cursorChar?: string;
        smartBackspace?: boolean;
        className?: string;
    }

    export default class Typed extends React.Component<TypedProps> {}
}
