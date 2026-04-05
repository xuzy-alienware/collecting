$(document).ready(function () {
    // setInterval(() => {
    analyze()

    // }, 5000)

    function analyze() {
        var head = ""
        var heads = $("#table_t>table>thead>tr").children()
        for (const hd of heads) {
            var value = getChildValue(hd)
            head += value
            head += ","
        }

        var trs = $("#table_m>table>tbody").children()
        if (!trs || trs.length <= 0) {
            return
        }
        var records = []
        for (const tr of trs) {
            let record = ""
            var tds = $(tr).children()

            for (const td of tds) {
                var value = getChildValue(td)
                record += value
                record += ","
            }
            // alert(record)
            records.push(record)
        }
        send(head, records)
    }

    function getChildValue(dom) {
        if ($(dom).children().length > 0) {
            return getChildValue($(dom).children().get(0))
        } else {
            return $(dom).text()
        }
    }

    function send(heads, records) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8099/stock/current/collect",
            dataType: 'json',
            data: JSON.stringify({"heads": heads, "data": records}),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                // draw(name, tradeDay, response);
            }
        });
    }
})