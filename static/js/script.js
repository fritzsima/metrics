
/*!
* Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

const Home = function () {
    let appColumns = [
        'country',
        'numApps',
        'appMethod',
        'appTiming',
        'appPlace',
        'cropCroup',
        'timePlot'
    ];
    let resultColumns = [
        "indication",
        "country",
        "numApps",
        "appMethod",
        "appPlace",
        "cropCroup",
        "timePlot",
        "numPlots",
        "totHrsTrial",
        "totTrials",
        "totHrsTD"
    ];

    const initializeAppDatatable = function () {
        let appColumnsDict = appColumns.map(e => ({data: e}));

        $('#app').DataTable({
            data: app,
            columns: appColumnsDict
        });
    }

    const initializeResultDatatable = function () {
        let resultColumnsDict = resultColumns.map(e => ({data: e}));

        $('#result').DataTable({
            data: result,
            columns: resultColumnsDict
        });
    }

    return {
        init: function () {
            initializeAppDatatable();
            initializeResultDatatable();
        }
    }
}();
