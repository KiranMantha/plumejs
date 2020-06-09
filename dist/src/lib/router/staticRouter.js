"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticRouter = void 0;
class StaticRouter {
    static checkParams(up, r) {
        let pmc = 0, po = {}, pc = r.ParamCount;
        for (let i = 0; i < up.length; i++) {
            var rtParam = r.Params[i];
            if (rtParam.indexOf(":") >= 0) {
                po[rtParam.split(":")[1]] = up[i];
                pmc += 1;
            }
        }
        if (pmc === pc) {
            return po;
        }
        return {};
    }
    static getParamCount(p) {
        let pc = 0;
        p.forEach((k) => {
            if (k.indexOf(":") >= 0) {
                pc += 1;
            }
        });
        return pc;
    }
    static formatRoute(r) {
        let obj = {
            Params: {},
            Url: "",
            Template: "",
            ParamCount: 0,
            IsRegistered: false,
            redirectTo: "",
            canActivate: () => true
        };
        obj.Params = r.path.split("/").filter((h) => {
            return h.length > 0;
        });
        obj.Url = r.path;
        obj.Template = "";
        obj.redirectTo = r.redirectTo;
        if (r.template) {
            if (!r.templatePath)
                throw Error("templatePath is required in route if template is mentioned.");
            obj.Template = r.template;
            obj.TemplatePath = r.templatePath;
        }
        if (r.canActivate)
            obj.canActivate = r.canActivate;
        obj.ParamCount = StaticRouter.getParamCount(obj.Params);
        StaticRouter.routList.push(obj);
    }
}
exports.StaticRouter = StaticRouter;
StaticRouter.routList = [];
