export default class Model {

    params = {}
    update = () => {}

    addParam ( opts ) {
        // const fields = source.split( '.' )
        const value = this.getNested( opts.source )
        this.setNested( 'params.' + opts.source + '.value', value )
        this.setNested( 'params.' + opts.source + '.opts', opts )
    }

    getNested( fields, set = false ) {
        fields = fields.split('.');

        let cur = this,
        last = fields.pop();

        fields.forEach( (field) => { 
            if ( set ) cur[field] = cur[ field ] ?? {}
            cur = cur[field] 
        })

        return set ? { cur, last } : cur[ last ];
    }

    setNested( fields, val) {

        const { cur, last } = this.getNested( fields, true )
        cur[ last ] = val

        return this;
    }

}