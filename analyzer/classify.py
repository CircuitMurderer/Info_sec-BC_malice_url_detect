import json

import numpy as np
from sklearn import svm


def load_data(fpath):
    with open(fpath, 'r') as f:
        datas = json.load(f)

    labels = []
    dataset = []
    for data in datas:
        labels.append(data['label'])
        features = data['features']
        features = sorted(features.items(), key=lambda x: x[0])
        features = [fea[1] for fea in features]
        dataset.append(features)

    print(dataset)
    dataset = np.array(dataset)
    labels = np.array(labels)

    return dataset[:], labels[:]


if __name__ == '__main__':
    fin_set, fin_label = load_data('results/result.json')
    print(fin_set, fin_label)
    mysvm = svm.SVC(C=1, kernel='rbf')
    mysvm.fit(fin_set, fin_label)

    p = np.array([[1, 0, 6, 860457, 1, 4, 1, 5, 2, 1573, 13, 449, 5]])
    print(mysvm.predict(p))
