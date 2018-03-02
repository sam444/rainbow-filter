import "../js/css/filterMore.min.css";
import "../js/css/mumayi_top.css";
import "../js/filterMore.min.js";
import "../js/layer.min.js";
import "../js/mumayi_top.min.js";
import { OnClickEvent, Param, Component } from "rainbowui-core";
import PropTypes from 'prop-types';
import i18n from "../i18n/i18n";

export default class Filter extends Component {

    componentDidMount() {
        super.componentDidMount();
        this.initComponent();
        this.hidenMore_a();
        this.hidenUnlimited_span();
        //this.chooseDefalutCkecked();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
        $(".filter_" + this.props.id).empty();
        $(".filter_btn").remove();
        let element = document.createElement("div");
        element.id = this.props.id;
        element.className = "searchbox";
        $(".filter_" + this.props.id).append(element);
        this.initComponent();
    }

    renderComponent() {
        return (
            <div class={"filter_" + this.props.id}>
                <div class="searchbox" id={this.props.id}></div>
            </div>
        );
    }

    initComponent() {
        let self = this;
        let expandRow;
        if (this.props.expandRow) {
            expandRow = this.props.expandRow;
        } else {
            expandRow = 2;
        }
        var options = {
            //查询事件
            "search": function (paramList) {
                self.onFilter(paramList);
            },
            //默认展开条件数
            "expandRow": expandRow,
            "expandEvent": function (state) {
                //展开更多条件触发事件 参数：state  true表示展开  false 收缩
                if (self.props.onExpand) {
                    self.props.onExpand(new OnClickEvent(self, event, Param.getParameter(self)));
                }
            },
            //查询条件
            "searchBoxs": this.props.dataSource,
            //国际化
            "expandMessage": i18n.expandMessage,
            "closeMessage": i18n.closeMessage,
            "allMessage": i18n.allMessage,
            "customMessage": i18n.customMessage,
            "expandRowNumMessage": i18n.expandRowNumMessage,
            "filterMoreNotSupportMessage": i18n.filterMoreNotSupportMessage,
            "confirmMessage": i18n.confirmMessage,
            "multiselectMessage": i18n.multiselectMessage,
            "singleSelectMessage": i18n.singleSelectMessage
        };
        $("#" + self.props.id).fiterMore(options);
    }
    hidenMore_a() {
        const filterObject_a = $("#" + this.componentId+".searchbox a");
        if (this.props.hidenMore == 'true') {
            filterObject_a.css("display", "none");
        }
    }
    hidenUnlimited_span() {
        const filterObject_span = $("#" + this.componentId+".searchbox .filter_option span:first-child");
        const filterObject_div = $("#" + this.componentId+".searchbox .control-type");
        if (this.props.hidenUnlimited == 'true') {
            filterObject_span.css("display", "none");
            filterObject_div.css("display", "none");
        }
    }
    onFilter(paramList) {
        //this.chooseCkecked(paramList);
        if (this.props.onClick) {
            this.props.onClick(new OnClickEvent(this, event, paramList));
        }
    }

    chooseDefalutCkecked() {
        let dataSourceList = this.props.dataSource;
        let results = [];
        dataSourceList.forEach((dataSource, index) => {
            if (dataSource.defaults) {
                let resultMap = { "ValueList": dataSource.defaults, "id": dataSource.id.replace("searchitem_", ""), "isMultiple": dataSource.isMultiple };
                results.push(resultMap);
            }
        });
        this.chooseCkecked(results);
    }

    chooseCkecked(paramList) {
        let dataSourceList = this.props.dataSource;
        paramList.forEach((param, index) => {
            let id = param.id;
            let valueList = param.ValueList;
            valueList.forEach((value, index) => {
                dataSourceList.forEach((dataSource, index) => {
                    if (dataSource.id == "searchitem_" + id) {
                        let data = dataSource.data;
                        data.forEach((d, index) => {
                            if (d.value == value) {
                                console.log("value", { "id": id, "value": d.value, "text": d.text });
                            }
                        });
                    }
                });
            });
        }
        );
    }

};


Filter.propTypes = $.extend({}, Component.propTypes, {
    hidenMore: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    hidenUnlimited: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

});


Filter.defaultProps = $.extend({}, Component.defaultProps, {
    hidenMore: 'false',
    hidenUnlimited: 'false',

});