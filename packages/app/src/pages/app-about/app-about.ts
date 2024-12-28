import {html, LitElement} from 'lit'
import {customElement}    from 'lit/decorators.js'

import {styles as sharedStyles} from '../../styles/shared-styles'

// You can also import styles from another file
// if you prefer to keep your CSS seperate from your component
import {styles}                 from './about-styles'

import '@shoelace-style/shoelace/dist/components/card/card.js'



@customElement('app-about')
export class AppAbout extends LitElement {
  static styles = [
    sharedStyles,
    styles
  ]


  render() {
    return html`
        <main>
            <h2>About Page</h2>

            <wa-card>
                <h2>Foo</h2>

                <p>PWAs have access to many useful APIs in modern browsers! These
                   APIs have enabled many new types of apps that can be built as PWAs, such as advanced graphics editing
                   apps, games,
                   apps that use machine learning and more!
                </p>

                <p>Check out <a
                        href="https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/handle-files"
                >these
                 docs</a> to learn more about the advanced features that you can use in your PWA</p>
            </wa-card>
        </main>
    `
  }
}
