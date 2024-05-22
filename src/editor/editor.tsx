import React, { useState, useEffect } from "react";
import { DesktopOutlined, MobileOutlined } from "@ant-design/icons";
import {
  alert,
  AlertComponent,
  confirm,
  SchemaObject,
  ToastComponent,
} from "amis";
import { Editor, ShortcutKey } from "amis-editor";
import { copy, fetcher, notify } from "@/utils/amisEnvUtils";
import "./editor.scss";
import "amis-editor-core/lib/style.css";

//import 'amis/lib/themes/antd.css';
// 编辑器 这里要引入 cxd 否则部分弹窗UI显示异常
import "amis/lib/themes/cxd.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";

// import "@fortawesome/fontawesome-free/css/all.css";
// import "@fortawesome/fontawesome-free/css/v4-shims.css";

const AMISEditor: React.FC = () => {
  const [preview, setPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [schema, setSchema] = useState({});

  useEffect(() => {
    async function fetchSchema() {
      // 获取数据
    }
    fetchSchema();
  }, []);

  // 当前语言
  const curLanguage = "zh-CN";

  async function save() {
    // 调用保存接口
  }

  function onChange(value: SchemaObject) {
    setSchema(value);
  }

  return (
    <div className="Editor">
      <div className="Editor-header">
        <div className="Editor-title">amis 可视化编辑器</div>
        <div className="Editor-view-mode-group-container">
          <div className="Editor-view-mode-group">
            <div
              className={`Editor-view-mode-btn editor-header-icon ${
                !isMobile ? "is-active" : ""
              }`}
              onClick={() => {
                setIsMobile(false);
              }}
            >
              {/* PC模式 */}
              <DesktopOutlined />
            </div>
            <div
              className={`Editor-view-mode-btn editor-header-icon ${
                isMobile ? "is-active" : ""
              }`}
              onClick={() => {
                setIsMobile(true);
              }}
            >
              {/* 移动模式 */}
              <MobileOutlined />
            </div>
          </div>
        </div>

        <div className="Editor-header-actions">
          {/* 快捷键 */}
          <div className="shortcut-box">
            <ShortcutKey />
          </div>

          {/* 国际化 */}
          {/* <SelectLang key="SelectLang" /> */}

          <div
            className={`header-action-btn m-1 ${preview ? "primary" : ""}`}
            onClick={() => {
              setPreview(!preview);
            }}
          >
            {preview ? "编辑" : "预览"}
          </div>
          {/* 保存 */}
          {!preview && (
            <div className={`header-action-btn exit-btn`} onClick={save}>
              保存
            </div>
          )}
        </div>
      </div>
      <ToastComponent
        theme={"cxd"}
        key="toast"
        position={"top-center"}
        locale={curLanguage}
      />
      <AlertComponent theme={"cxd"} key="alert" locale={curLanguage} />
      <div className="Editor-inner">
        <Editor
          theme={"cxd"}
          preview={preview}
          isMobile={isMobile}
          value={schema as SchemaObject}
          onChange={onChange}
          onPreview={() => {
            setPreview(true);
          }}
          onSave={save}
          className="is-fixed"
          showCustomRenderersPanel={true}
          amisEnv={{
            fetcher,
            notify,
            alert,
            copy,
            confirm,
          }}
        />
      </div>
    </div>
  );
};

export default AMISEditor;
