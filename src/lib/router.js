let router = (ajaxHtmlLoad) => {
  let $m = {
      currentRoute: {},
      currentPage: "",
      routeList: [],
      rdom: {}
    },
    returnObj = {};

  let getParamCount = (p) => {
    let pc = 0;
    p.forEach((k, i) => {
      if (k.indexOf(":") >= 0) {
        pc += 1;
      }
    });
    return pc;
  };

  let routerClass = function (r) {
    this.Params = r.path.split("/").filter(function (h) {
      return h.length > 0;
    });
    this.Url = r.path;
    this.template = "";
    if (r.template) {
      this.template = r.template;
    } else if (r.templateUrl) {
      //get page via ajax
      ajaxHtmlLoad(r.templateUrl).then(function (html) {
        this.template = html;
      });
    }
    this.ParamCount = getParamCount(this.Params);
  };

  let addRoutes = (routes) => {
    if (typeof routes && routes instanceof Array) {
      let rr = null;
      for (let r of routes) {
        $m.routeList.push(new routerClass(r));
        if (r.redirectTo) {
          rr = r;
        }
      }
      if (rr) {
        navigateTo(rr.redirectTo);
      }
    } else {
      throw Error("router.addRoutes: the parameter must be an array");
    }
  };

  let checkParams = (up, r) => {
    let pmc = 0,
      po = {},
      pc = r.ParamCount;

    for (let i = 0; i < up.length; i++) {
      let rtParam = r.Params[i];
      if (rtParam.indexOf(":") >= 0) {
        po[rtParam.split(":")[1]] = up[i];
        pmc += 1;
      }
    }
    if (pmc === pc) {
      return po;
    }
    return false;
  };

  $m.navigateTo = (path) => {
    if ($m.currentPage !== path) {
      $m.previousPage = $m.currentPage;
      $m.currentPage = path;
      let uParams = path.split("/").filter((h) => {
        return h.length > 0;
      });
      let isRouteFound = 0;
      for (let i = 0; i < $m.routeList.length; i++) {
        if (isRouteFound === 0) {
          let routeItem = $m.routeList[i];
          if (routeItem.Params.length === uParams.length) {
            let _params = checkParams(uParams, routeItem);
            if (
              _params &&
              (Object.keys(_params).length > 0 || path === routeItem.Url)
            ) {
              isRouteFound += 1;
              $m.currentRoute.params = _params;
              $m.rdom.innerHTML = routeItem.template;
              break;
            }
          }
        }
      }
    }
  };

  window.onpopstate = () => {
    navigateTo(window.location.pathname);
  };

  let navigateTo = (path) => {
    window.history.pushState(null, null, path);
    $m.navigateTo(path);
  };

  let onNavigationStart = (cb) => {
    if (cb && typeof cb === "function") {
      window.addEventListener("hashchange", cb, false);
    }
  };

  returnObj = Object.freeze({
    setRouterOutlet: (d) => {
      $m.rdom = d;
    },
    addRoutes: addRoutes,
    currentRoute: () => {
      return $m.currentRoute;
    },
    navigateTo: navigateTo,
    onNavigationStart: onNavigationStart
  });

  return returnObj;
};

export default router;