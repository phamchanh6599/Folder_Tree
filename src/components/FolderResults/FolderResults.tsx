/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import './FolderResults.scss';

import React, { useState, useCallback } from 'react';
import { Tree, Input } from 'antd';

import { TreeProps } from '../../common/type';
import { TREE_DATAS } from '../../common/mockData';

import { AddMoreFolder } from '../AddMoreFolder/AddMoreFolder';

const { Search } = Input;
const { DirectoryTree } = Tree;

const dataList: any[] = [];

const generateList = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node?.key || '';
    dataList.push({ key, title: key });
    if (node?.children) {
      generateList(node.children);
    }
  }
};
generateList(TREE_DATAS);

export const FolderResults: React.FC = () => {
  const [state, setState] = useState({
    searchValue: '',
    autoExpandParent: true,
  });
  const [isAddMore, setIsAddMore] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [listDatas, setListDatas] = useState<TreeProps[]>(TREE_DATAS);
  const [flatDatas, setFlatDatas] = useState(dataList);

  const handleVisibleDisplay = useCallback((listVisible: string[]) => {
    if (listVisible && listVisible.length) {
      if (listVisible[0] === 'everyone') return 'Visible to Everyone';
      else if (listVisible[0] === 'me') return 'Only visible to Me';

      return `Visible to ${listVisible.join(', ')}`;
    }
    return '';
  }, []);

  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys);
    setState({
      ...state,
      autoExpandParent: false,
    });
  };

  const getParentKey = useCallback((key: string, tree: any) => {
    let parentKey: any;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: any) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    console.log('flatDatas', flatDatas);
    const expandedKeys = flatDatas
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, TREE_DATAS);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(expandedKeys);
    setState({
      searchValue: value,
      autoExpandParent: true,
    });
  }, []);

  const loop = (data: any[]): any => {
    return data.map((item) => {
      const index = item.title.indexOf(state.searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + state.searchValue.length);
      const title =
        index > -1 ? (
          <span className='FolderResults__title-folder'>
            <span className='FolderResults__title-folder-text'>
              <span>
                {beforeStr}
                <span
                  className='site-tree-search-value'
                  style={{ color: 'red' }}
                >
                  {state.searchValue}
                </span>
                {afterStr}
              </span>
            </span>
            <span className='FolderResults__title-folder-visible'>
              {handleVisibleDisplay(item.visible)}
            </span>
          </span>
        ) : (
          <span className='FolderResults__title-folder'>
            <span className='FolderResults__title-folder-text'>
              {item.title}
            </span>
            <span className='FolderResults__title-folder-visible'>
              {handleVisibleDisplay(item.visible)}
            </span>
          </span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });
  };

  const onDrop = useCallback((info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data: any, key: any, callback: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...listDatas];

    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item: any, index: any, arr: any) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item: any) => {
        item.children = item.children || [];
        // where to inserx
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item: any) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: any[] = [];
      let i: any;
      loop(data, dropKey, (item: any, index: any, arr: any[] = []) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    const newData = [];
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      newData.push({ key, title: key });
      if (node.children) {
        generateList(node.children);
      }
    }

    setFlatDatas(newData);
    setListDatas(data);
  }, []);

  const addMore = () => {
    setIsAddMore(true);
  };

  const addMoreFolders = (newFolder: TreeProps) => {
    listDatas.push(newFolder);
    setListDatas(listDatas);
    console.log('SAVE', newFolder);
  };

  return (
    <div className='FolderResults'>
      <div className='FolderResults__header'>
        <div className='FolderResults__search'>
          <Search
            style={{ marginBottom: 8 }}
            placeholder='Search by title'
            onChange={onChange}
          />
        </div>
        {!isAddMore && (
          <span className='FolderResults__add' onClick={addMore}>
            Add New Folder
          </span>
        )}
      </div>

      <div className='FolderResults__add-form'>
        {isAddMore && (
          <AddMoreFolder
            onCancel={() => setIsAddMore(false)}
            onSave={(newFolder: TreeProps) => addMoreFolders(newFolder)}
          />
        )}
      </div>

      <DirectoryTree
        className='draggable-tree'
        multiple
        draggable
        blockNode
        onDrop={onDrop}
        defaultExpandAll
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={state.autoExpandParent}
        treeData={loop(listDatas)}
      />
    </div>
  );
};
