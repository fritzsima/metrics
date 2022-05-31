
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
    let appDatatable;
    let appHeaderFilter = {};

    const initializeSelect2Adapter = function () {
        $.fn.select2.amd.define('select2/selectAllAdapter', [
            'select2/utils',
            'select2/dropdown',
            'select2/dropdown/attachBody'
        ], function (Utils, Dropdown, AttachBody) {

            function SelectAll() { }
            SelectAll.prototype.render = function (decorated) {
                const self = this,
                    $rendered = decorated.call(this),
                    $selectAll = $(
                        '<button class="btn btn-xs btn-default" type="button" style="margin-left:6px;"><i class="fa fa-check-square-o"></i> Select All</button>'
                    ),
                    $unselectAll = $(
                        '<button class="btn btn-xs btn-default" type="button" style="margin-left:6px;"><i class="fa fa-square-o"></i> Unselect All</button>'
                    ),
                    $btnContainer = $('<div style="margin-top:3px;">').append($selectAll).append($unselectAll);
                if (!this.$element.prop("multiple")) {
                    // this isn't a multi-select -> don't add the buttons!
                    return $rendered;
                }
                $rendered.find('.select2-dropdown').prepend($btnContainer);
                $selectAll.on('click', function (e) {
                    const options = self.$element[0].options;
                    const values = $.map(options, e => $(e).val());
                    self.$element.val(values).trigger('change');
                    self.trigger('close');
                });
                $unselectAll.on('click', function (e) {
                    self.$element.val(null).trigger('change');
                    self.trigger('close');
                });
                return $rendered;
            };

            return Utils.Decorate(
                Utils.Decorate(
                    Dropdown,
                    AttachBody
                ),
                SelectAll
            );

        });
    }

    const initializeAppDatatable = function () {
        let appColumnsDict = appColumns.map(e => ({data: e}));

        appDatatable = $('#app').DataTable({
            columns: appColumnsDict,
            scrollX: true,
        });

        // Header filter multiple select and select/deselect
        $('#app_wrapper .dataTables_scrollHead thead tr:eq(0) th').each(function (i) {
            const $this = $(this);
            const title = $this.text();

            // $this.html(null);
            const columnName = appColumns[i];
            appHeaderFilter[columnName] = $('<select class="form-control select2" multiple></select>')
                .appendTo($this)
                .select2({
                    placeholder: "Select " + title + "...",
                    multiple: true,
                    dropdownAdapter: $.fn.select2.amd.require('select2/selectAllAdapter')
                }).on('change', function () {
                    if (!appDatatable) return;
                    const regexTerm = $(this).val()
                        .map(e => {return "(^" + escapeRegex(e) + "$)";})
                        .join('|');
                    appDatatable.columns(i).search(regexTerm, true).draw();
                });
        });
    }

    const displayDataAppDatatable = function () {
        appDatatable.clear();
        appDatatable.rows.add(app);
        appDatatable.draw();

        for (const i in appColumns) {
            const columnName = appColumns[i];
            let columnData = getUniqueList(app, columnName);
            appHeaderFilter[columnName].empty();
            columnData = columnData.sort().map(function (e) {
                let newOption = new Option(e, e, false, false);
                appHeaderFilter[columnName].append(newOption);
            });
            appHeaderFilter[columnName].trigger('change');
        }
    }

    const initializeResultDatatable = function () {
        let resultColumnsDict = resultColumns.map(e => ({data: e}));

        $('#result').DataTable({
            data: result,
            columns: resultColumnsDict,
            scrollX: true,
        });
    }

    const handleCalculateClick = () => {
        $('#calculate').on('click', function (e) {
            $('#result_wrapper').css('display', 'block')
        })
    }

    return {
        init: function () {
            initializeSelect2Adapter();
            initializeAppDatatable();
            displayDataAppDatatable();
            initializeResultDatatable();
            handleCalculateClick();
        }
    }
}();
