const START_THEME =     JSON.parse(localStorage.getItem('theme'))
const START_LANG =      JSON.parse(localStorage.getItem('lang'))
const START_AREA =      JSON.parse(localStorage.getItem('area'))



function ObjEquals(obj1, obj2) {
    return JSON.stringify(obj1) == JSON.stringify(obj2)
}

class ThemesObj {
    static current;
    static isDynamic;
    static $themeAnim = $js(`#themeAnimation`); 

    static Start() {
        ThemesObj.setTheme(); 


        if (ObjEquals(ThemesObj.current, ThemesObj.Light)) 
            $js(`#lightBtn`).addClass('active-btn')
        else if (ObjEquals(ThemesObj.current, ThemesObj.Dark))
            $js(`#darkBtn`).addClass('active-btn');
        else 
            $js(`#dynamicBtn`).addClass('active-btn');


        $js(`.header-theme button`).onEvent('click', (e) => { 
            if (e.hasClass(`active-btn`)) return;
            
            e.parent()
                .find(`.active-btn`)
                .removeClass(`active-btn`);
            e.addClass(`active-btn`);

            ThemesObj.Animate(e);
        });
    }
    static getNextTheme = (id) => {
        if (!id) return ThemesObj.Default;
        if (id == 'lightBtn' || ObjEquals(id, ThemesObj.Light)) 
            return ThemesObj.Light;
        else if (id == 'darkBtn' || ObjEquals(id, ThemesObj.Dark))
            return ThemesObj.Dark;
        else {
            if (ThemesObj.current && ThemesObj.current == ThemesObj.Dark)
                return ThemesObj.DynamicDark;
            else if (ObjEquals(id, ThemesObj.DynamicDark))
                return ThemesObj.DynamicDark;
            else 
                return ThemesObj.DynamicLight;
        }
    }



    static setTheme(id = null) {
        ThemesObj.current = ThemesObj.getNextTheme(id || START_THEME)

        let keys = Object.keys(ThemesObj.current);
        let styles =  Object.values(ThemesObj.current);
        for (let i = 0; i < keys.length; i++)
            document
                .documentElement
                .style
                .setProperty(keys[i], styles[i]);

        ThemesObj.isDynamic = 
            ThemesObj.current == ThemesObj.DynamicDark || 
            ThemesObj.current == ThemesObj.DynamicLight;
        localStorage.setItem('theme', JSON.stringify(ThemesObj.current));
    } 
    static Animate($btn) {
        const getTransition = (speed) => {
            return  'transform '+ speed +'ms ease-in-out,'+
                    'top '+ speed +
                    'ms, left '+ speed + 'ms';
        } 
        const speed = 550;
        const coord = $btn.find('span').rect(); 
        const size = $js('body').rect()
        let maxSize = Math.max(size.width, size.height);
        let maxCoord = maxSize == size.width ? size.width - coord.left : coord.top;
        let hypotenuse = Math.sqrt(size.width*size.width + size.height* size.height);
        // 20 below is a size of btnDOM.span (icon of theme)
        const scale = 2 * (hypotenuse - maxCoord) / 20; 

        let nextBackground = ThemesObj.getNextTheme($btn.id())['--h-background']

        ThemesObj.$themeAnim.css({
            'display': 'block',
            'background': nextBackground,
            'top': coord.top + 'px', 
            'left': coord.left + 'px',
        });
        setTimeout(() => {
            ThemesObj.$themeAnim.animate({
                'transform': 'scale('+ scale +')'
            }, getTransition(speed), () => {
                ThemesObj.setTheme($btn.id())
                ThemesObj.$themeAnim.animate({
                    'top': size.height * 0.9 + 'px', 
                    'left': '100px',
                }, 0, () => {
                    ThemesObj.$themeAnim.animate({
                        'top': size.height + 'px', 
                        'left': '-21px', 
                        'transform': 'scale(2)', 
                    }, getTransition(speed), () => {
                        ThemesObj.$themeAnim.css({
                            'display': 'none'
                        })
                    });
                });
            });
        }, 1); 
    }



    static Light = {
        '--based-color': '#444',
        '--revert-color': '#fffc',
        '--accent-color': '#8cb9f1',
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#bbb',

        '--main-background': '#fef9f2', 
        '--main-background-size': 'initial',
        '--globe-background': 'linear-gradient(104deg, #a0c7ef8f, #0070ffad)',
        '--area-title-background': '#0000',
        '--about-background': '#f7f7f7',
        '--edge-shadow': '0px 1px 14px -7px #777',
        
    
        '--h-background': '#fff',
        '--controls-border': '1px solid #999',
        '--controls-disabledcolor': '#585858',
        '--controls-hoverBackground': '#e4e4e5',
        '--settings-background': '#d7ddf3c2',
        '--settings-filter': 'drop-shadow(6px 8px 19px #bbb)',
        '--settingsBtn-background': '#e3dfdf',
        '--settingsBtn-border': '1px solid #cfcfcf',
    
        '--sd-background': '#f7f7f7',
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#5050502e',
        '--list-headerColor': '#000',
        '--list-linkColor': '#0142b9', 
        '--list-fontWeight': '900'
    }
    static Dark = {
        '--based-color': '#fffc',
        '--revert-color': '#444',
        '--accent-color': '#8cb9f1',
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#555',

        '--main-background': 'linear-gradient(130deg, #484848, #15151e)',
        '--main-background-size': 'initial',
        '--globe-background': 'linear-gradient(104deg, #007eff73, #00023ab3)',
        '--area-title-background': '#0000',
        '--about-background': '#232324',
        '--edge-shadow': '0px 1px 14px -7px #000', 
    
        '--h-background': '#2e2e2e', 
        '--controls-border': '1px solid #676767',
        '--controls-disabledcolor': '#b9b9b9',
        '--controls-hoverBackground': '#5c5c5c',
        '--settings-background': '#82828b94',
        '--settings-filter': 'drop-shadow(6px 8px 19px #000)',
        '--settingsBtn-background': '#59595f',
        '--settingsBtn-border': '1px solid #686868',

    
        '--sd-background': '#232324',
        '--placeholder-color': '#a0a0a0',
        '--list-background': '#9d9d9d44',
        '--list-headerColor': '#fffc',
        '--list-linkColor': '#93c3ff', 
        '--list-fontWeight': '100'
    }
    static DynamicLight = {
        '--based-color': '#444',
        '--revert-color': '#fff',
        '--accent-color': '#8cb9f1', 
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#bbb',

        '--main-background' : 'linear-gradient(135deg, #dcefff 0%,#79c1ff 20%, #46abf5 35%,#1879fb 45%, #4060ff 50%, #1d49ad 60%, #131c6e 70%, #040f46 80%,#000000 90%)',
        '--main-background-size': '250% 250%',
        '--main-background-position': '0% 0%',
        '--globe-background': 'linear-gradient(114deg, #5bacffa1, #0e007e)',
        '--area-title-background': '#fff7',
        '--about-background': '#f7f7f7',
        '--edge-shadow': '0px 1px 14px -7px #777',
        
    
        '--h-background': '#fff',
        '--controls-border': '1px solid #999',
        '--controls-disabledcolor': '#585858',
        '--controls-hoverBackground': '#e4e4e5',
        '--settings-background': '#d7ddf3c2',
        '--settings-filter': 'drop-shadow(6px 8px 19px #00000094)',
        '--settingsBtn-background': '#e3dfdf',
        '--settingsBtn-border': '1px solid #cfcfcf',
    
        '--sd-background': '#fff7',
        '--placeholder-color': '#444',
        '--list-background': '#fff',
        '--list-headerColor': '#000',
        '--list-linkColor': '#0142b9', 
        '--list-fontWeight': '900'
    }
    static DynamicDark = {
        '--based-color': '#fffc',
        '--revert-color': '#444',
        '--accent-color': '#8cb9f1', 
        '--light-color': '#fffc',
        '--dark-color': '#444',
        '--disabled-color': '#555',

        '--main-background': 'linear-gradient(135deg, #b4dcff 0%,#79c1ff 20%, #46abf5 35%,#1879fb 45%, #4060ff 50%, #1d49ad 60%, #131c6e 70%, #040f46 80%,#000000 90%)', 
        '--main-background-size': '250% 250%',
        '--main-background-position': '75% 75%',
        '--globe-background': 'linear-gradient(114deg, #5bacffa1, #0e007e)',
        '--area-title-background': '#0009',
        '--about-background': '#232324',
        '--edge-shadow': '0px 1px 14px -7px #000', 
    
        '--h-background': '#2e2e2e', 
        '--controls-border': '1px solid #676767',
        '--controls-disabledcolor': '#b9b9b9',
        '--controls-hoverBackground': '#5c5c5c',
        '--settings-background': '#82828b94',
        '--settings-filter': 'drop-shadow(6px 8px 19px #00000073)',
        '--settingsBtn-background': '#59595f',
        '--settingsBtn-border': '1px solid #686868',

    
        '--sd-background': '#0009', 
        '--placeholder-color': '#ccc',
        '--list-background': '#00000070',
        '--list-headerColor': '#fffc',
        '--list-linkColor': '#93c3ff', 
        '--list-fontWeight': '100'
    } 
    static Default = ThemesObj.Light;
}


class LanguagesObj {
    static current;
    static CONTENT;
    static LANGTYPES = {
        'ru': 'ru',
        'en': 'en',
        'fr': 'fr',
        'sp': 'sp'
    };
    static TEXT = {
        'ru': [
            'в разработке...',
            `
                Если вы читаете это описание, значит, страница находится в разработке и вскоре будет исправлена для улучшения пользовательского опыта.
                <br><br>
                Если у Вас есть идеи/предложения как можно исправить страницу, пожалуйста, свяжитесь со мной. На главной странице, в разделе "Мои контакты", можно отрпавить электронное письмо или выбрать любую доступную для Вас медиа.
                <br><br>
                Носители английского, французского или испанского языков так же приветствуются для более корректного перевода страниц.
                <br><br>
                Спасибо.
            `,
            'Самые значимые реки',
            'Подробнее',
            'Реки в регионе',

            'Вернуться'
        ], 
        'en': [
            'in development...',
            `
                If you see this description, it means that the page is under development and will soon be fixed to make the user experience of using the resource even better.
                <br><br>
                Please, if you have any ideas/suggestions on how to fix this page, let us know on the main page in the "Contacts" section, in an email or in any media available to you.
                <br><br>
                Native speakers of English, Spanish and French are also welcome for more correct translation of pages.
                <br><br>
                Thanks.
            `,
            'The most significant rivers',
            'Read more',
            'Rivers of',

            'Return'
        ],
        'fr': [
            'en developpement...',
            `
                Si vous lisez cette Description, cela signifie que la page est en developpement et sera bientot corrigee pour ameliorer l\'experience utilisateur.
                <br><br>
                Si vous avez des idées/suggestions sur la facon de corriger la page, veuillez me contacter. Sur la page d\'accueil, dans La section "Mes contacts", vous pouvez envoyer un e-mail ou selectionner n\'importe quel Media disponible pour vous.
                <br><br>
                Les locuteurs natifs de l\'anglais, du francais ou de l\'espagnol sont egalement les bienvenus pour une traduction plus correcte des pages.
                <br><br>
                Merci.
            `,
            'Les rivieres les plus importantes',
            'Lire plus',
            'Rivieres dans la region',

            'Revenir'
        ],
        'sp': [
            'en desarrollo...',
            `
                Si esta leyendo esta descripcion, significa que la pagina esta en desarrollo y pronto se corregira para mejorar la experiencia del usuario.
                <br><br>
                Si Usted tiene alguna idea/sugerencia de como se puede arreglar la pagina, por favor pongase en contacto conmigo. En la pagina de Inicio, en la seccion "Mis contactos", puede enviar un email o seleccionar cualquier medio disponible para usted.
                <br><br>
                Los hablantes nativos de Ingles, frances o espanol tambien son bienvenidos para una traduccion mas correcta de las paginas.
                <br><br>
                Gracias.
            `,
            'Los rios mas significativos',
            'Leer mas',
            'Rios en la region',

            'Regresar'
        ]
    }



    static Start() {
        LanguagesObj.setLang();
        LanguagesObj.TranslatePage();

        if (LanguagesObj.current == LanguagesObj.LANGTYPES.en)
            $js(`#enBtn`).addClass(`active-btn`);
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.fr)
            $js(`#frBtn`).addClass(`active-btn`);
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.sp)
            $js(`#spBtn`).addClass(`active-btn`);
        else 
            $js(`#ruBtn`).addClass(`active-btn`);
        
        
        
        $js(`.header-language button`).onEvent('click', (e) => {
            if (e.hasClass(`active-btn`)) return;

            e.parent()
                .find(`.active-btn`)
                .removeClass(`active-btn`);
            e.addClass(`active-btn`);


            LanguagesObj.setLang(e.id());
            LanguagesObj.TranslatePage(true);
        })
    }
    

    static setLang(id = null) {
        id = id || START_LANG;
        if (id == 'ruBtn' || id == LanguagesObj.LANGTYPES.ru) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.ru;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.ru;
        }
        else if (id == 'frBtn' || id == LanguagesObj.LANGTYPES.fr) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.fr;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.fr;
        }
        else if (id == 'spBtn' || id == LanguagesObj.LANGTYPES.sp) {
            LanguagesObj.current = LanguagesObj.LANGTYPES.sp;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.sp;
        }
        else { 
            LanguagesObj.current = LanguagesObj.LANGTYPES.en;
            LanguagesObj.CONTENT = LanguagesObj.TEXT.en;
        }

        localStorage.setItem('lang', JSON.stringify(LanguagesObj.current))
    }
    static TranslatePage() {
        areaItem.name = LanguagesObj.TranslateObj(areaItem);
        $js(`#introduction h2`).text(`${areaItem.name} ${LanguagesObj.CONTENT[0]}`);
        $js(`#introduction p`).ihtml(LanguagesObj.CONTENT[1]);
        
        $js(`#significant h2`).text(LanguagesObj.CONTENT[2]);
        $js(`#significant button`).text(LanguagesObj.CONTENT[3]);

        $js(`#list h2`).ihtml(`${LanguagesObj.CONTENT[4]} <i>«</i>${areaItem.name}<i>»</i>`);
        
        $js(`#backSign span`).text(LanguagesObj.CONTENT[5])
    }
    static TranslateObj(obj) {
        if (LanguagesObj.current == LanguagesObj.LANGTYPES.en)
            return obj.en;
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.fr)
            return obj.fr;
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.sp)
            return obj.sp;
        else 
            return obj.ru;
    } 
    static TranslateInfo(obj) {
        if (LanguagesObj.current == LanguagesObj.LANGTYPES.en)
            return obj.enInfo;
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.fr)
            return obj.frInfo;
        else if (LanguagesObj.current == LanguagesObj.LANGTYPES.sp)
            return obj.spInfo;
        else 
            return obj.ruInfo;
    }
}





