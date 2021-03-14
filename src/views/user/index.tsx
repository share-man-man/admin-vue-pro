import { defineComponent, ref } from "vue";
import { Input, Button } from "ant-design-vue";
import { login } from "@/services/oauth";
import { RouterView, useRouter } from "vue-router";
import { setTokenObj } from "@/utils/tokens";
import { useStore } from "vuex";
import { LayoutState } from "@/store/modules/layout";
import style from "./style.module.less";

export default defineComponent({
  setup() {
    const store = useStore<{ layout: LayoutState }>();

    return () => (
      <div
        id="userLayout"
        class={[
          style["user-layout-wrapper"],
          store.state.layout.isMobile && style["mobile"]
        ]}
      >
        <div class={style["container"]}>
          <div class={style["user-layout-lang"]}>
            {/* <select-lang class="select-lang-trigger" /> */}
          </div>
          <div class={style["user-layout-content"]}>
            <div class={style["top"]}>
              <div class={style["header"]}>
                <a href="/">
                  {/* <img
                    src="~@/assets/logo.svg"
                    class={style["logo"]}
                    alt="logo"
                  /> */}
                  <span class={style["title"]}>Admin Vue Pro</span>
                </a>
              </div>
              <div class={style["desc"]}>
                Talk is cheap, show me the code! (少逼逼，上码)
              </div>
            </div>

            <RouterView />

            <div class={style["footer"]}>
              <div class={style["links"]}>
                <a href="_self">帮助</a>
                <a href="_self">隐私</a>
                <a href="_self">条款</a>
              </div>
              <div class={style["copyright"]}>
                Copyright &copy; 2021 admin-vue-pro
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
