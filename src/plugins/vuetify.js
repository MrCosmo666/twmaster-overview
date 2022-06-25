// Styles
import '@mdi/font/css/materialdesignicons.css';
import '../styles/variables.scss';
import '../styles/custom.scss';

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
        variations: {
            colors: ['primary', 'secondary'],
            lighten: 5,
            darken: 5,
        },
        themes: {
            dark: {
                colors: {
                    primary: '#eeeeee',
                    secondary: '#191919',
                    surface: '#191919'
                }
            },
            light: {
                colors: {
                    primary: '#212121',
                    secondary: '#eeeeee',
                    surface: '#eeeeee'
                }
            }
        }
    }
})
