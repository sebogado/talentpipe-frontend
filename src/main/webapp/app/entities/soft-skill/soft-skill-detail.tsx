import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './soft-skill.reducer';
import { ISoftSkill } from 'app/shared/model/soft-skill.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISoftSkillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SoftSkillDetail extends React.Component<ISoftSkillDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { softSkillEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentpipeApp.softSkill.detail.title">SoftSkill</Translate> [<b>{softSkillEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentpipeApp.softSkill.name">Name</Translate>
              </span>
            </dt>
            <dd>{softSkillEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentpipeApp.softSkill.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{softSkillEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentpipeApp.softSkill.description">Description</Translate>
              </span>
            </dt>
            <dd>{softSkillEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/soft-skill" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/soft-skill/${softSkillEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ softSkill }: IRootState) => ({
  softSkillEntity: softSkill.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoftSkillDetail);
