function cacheTester(customCacheFactory, testKey, factoryKey, cf, testData) {
    //Should be able to put stuff in cache.
    customCacheFactory.put(testKey, testData);
    expect(customCacheFactory.get(testKey)).toEqual(testData);
    //Should be able to modify cache
    testData.is = 'a stark';
    customCacheFactory.put(testKey, testData);
    expect(customCacheFactory.get(testKey)).toEqual(testData);
    //Should be able to delete a part of the cached value
    delete testData.is;
    customCacheFactory.put(testKey, testData);
    expect(customCacheFactory.get(testKey)).toEqual(testData);

    //check that a proper cache object was created with the key defined in dataCacheSessionStorage factory
    expect(cf['$$id']).toEqual(factoryKey);

    //make sure the cache can be deleted.
    customCacheFactory.remove(testKey);
    expect(customCacheFactory.get(testKey)).toEqual(undefined);

    //expect that accessing the cache through the factory should be the same as accessing it through CacheFactory
    expect(cf).toEqual(customCacheFactory);

    //expect that we should get an error when trying to retrieve a destroyed cache.
    customCacheFactory.destroy();
    expect(function () {
        customCacheFactory.get(testKey)
    }).toThrow(new TypeError("Cannot use 'in' operator to search for 'testKey' in null"));
};

function getCompiledElement(rawHtml, scope, compile){
    var element = angular.element(rawHtml);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
}