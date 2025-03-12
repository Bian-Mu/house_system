import json

def insert_options(data):
    for option in data:
        # 在第一层的children中插入 "全省"
        if 'children' in option:
            option['children'].insert(0, {"value": 1, "label": "全省"})
            
            # 在第二层的children中插入 "全市"
            for child in option['children']:
                if 'children' in child:
                    child['children'].insert(0, {"value": 0, "label": "全市"})
    return data

# 读取JSON文件
with open('options.json', 'r', encoding='utf-8') as file:
    options_data = json.load(file)

# 插入新的选项
updated_data = insert_options(options_data)

# 写回JSON文件
with open('updated_options.json', 'w', encoding='utf-8') as file:
    json.dump(updated_data, file, ensure_ascii=False, indent=4)

print("处理完成，结果已写入 updated_options.json")